import { Injectable, Injector, Predicate } from '@angular/core';
import { ConfirmOptions, DialogService } from '@mcisse/nge/ui/dialog';
import { CodIcon, FileIcon } from '@mcisse/nge/ui/icon';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { URI } from 'vscode-uri';
import { IContribution } from '../contributions';
import { FileChangeType, FileService } from '../files';
import { Paths } from '../utils';
import { Editor, EditorGroup, EditorState } from './editor';
import { OpenOptions } from './opener';


@Injectable()
export class EditorService implements IContribution {
    readonly id = 'workbench.contrib.editor-service';
    private readonly subscriptions: Subscription[] = [];
    private readonly groups: Map<string, EditorGroup> = new Map();

    private readonly didOpen = new Subject<URI>();
    private readonly willOpen = new Subject<URI>();

    private readonly state$ = new BehaviorSubject<EditorState>({ visibleEditors: [] });
    private readonly editorGroups$ = new BehaviorSubject<EditorGroup[]>([]);

    private editors: Editor[] = [];

    /** State of the editor. */
    readonly state = this.state$.asObservable();

    /** Emitted after opening a resource. */
    readonly onDidOpen = this.didOpen.asObservable();
    /** Emitted before opening a resource. */
    readonly onWillOpen = this.willOpen.asObservable();

    /** Opened editor groups. */
    readonly editorGroups = this.editorGroups$.asObservable();

    /** shorcut to state.value.activeGroup */
    get activeGroup(): EditorGroup | undefined {
        return this.state$.value.activeGroup;
    }

    /** shorcut to state.value.activeEditor */
    get activeEditor(): Editor | undefined {
        return this.state$.value.activeEditor;
    }

    /** shorcut to state.value.activeResource */
    get activeResource(): URI | undefined {
        return this.state$.value.activeResource;
    }

    /** shorcut to state.value.visibleEditors */
    get visibleEditors(): ReadonlyArray<Editor> {
        return this.state$.value.visibleEditors;
    }

    constructor(
        private readonly injector: Injector,
        private readonly fileService: FileService,
        private readonly dialogService: DialogService,
    ) { }

    activate(): void {
        this.subscriptions.push(
            this.fileService.onDidChangeFile.subscribe(changes => {
                changes.forEach(change => {
                    if (change.type === FileChangeType.Deleted) {
                        this.close(change.uri, true);
                    }
                })
            })
        );
    }

    deactivate(): void {
        this.editors = [];
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.splice(0, this.subscriptions.length);
        this.groups.clear();
    }

    /**
     * Register new editor types.
     *
     * Note:
     * The editor opening algorithm will go through the list from the last registered to the first to choose the one that can open a resource.
     * @param editors Editors to register.
     */
    registerEditors(...editors: Editor[]): void {
        editors.forEach(editor => {
            if (this.editors.find((entry) => entry.name === editor.name)) {
                throw new Error(
                    `There is already a editor registered with the id ${editor.name}`
                );
            }
            this.editors.unshift(editor);
        });
    }

    /**
     * Checks whether the given `resource` is opened in any editor.
     * @param resource The resource to test.
     * @returns `true` if the resource is opened `false` otherwises.
     */
    isOpened(resource: URI): boolean {
        return !!this.findGroups(group => group.contains(resource)).length;
    }

    /**
     *  Checks whether `group` is the active one inside the editor.
     * @param group the group.
     */
    isActiveGroup(group: EditorGroup): boolean {
        const active = this.state$.value.activeGroup;
        return !!active && active.id === group.id;
    }

    /**
     * Sets `group` as the active group.
     * @param group the group to focus.
     */
    setActiveGroup(group: EditorGroup): void {
        this.state$.next({
            ...this.state$.value,
            activeGroup: group,
            activeEditor: group.activeEditor,
            activeResource: group.activeResource,
            visibleEditors: this.editorGroups$.value.map(g => g.activeEditor as any).filter(e => !!e)
        });
    }

    /**
     * Finds the first group whichs meets the predicate.
     * @param predicate the predicate to test.
     * @returns An `EditorGroup` object or `null`
     */
    findGroup(predicate: Predicate<EditorGroup>): EditorGroup | undefined {
        return this.listGroups().find(predicate);
    }

    /**
     * Finds all the groups whichs meets the predicate.
     * @param predicate the predicate to test.
     * @returns An array of `EditorGroup` objects.
     */
    findGroups(predicate: Predicate<EditorGroup>): EditorGroup[] {
        return this.listGroups().filter(predicate);
    }

    /**
     * Finds the group with the given id.
     * @param id the id of the group
     * @returns the group or undefined.
     */
    findGroupById(id: string): EditorGroup | undefined {
        return this.groups.get(id);
    }

    /**
     * Opens the resource with the right editor and set it has the new active resource of the editor.
     * @param resource The resource to open.
     * @param options Open options.
     */
    async open(resource: URI, options?: Partial<OpenOptions>): Promise<void> {
        let group: EditorGroup;
        const editorGroups = this.listGroups();
        options = options || {};

        if (options.preview) {
            group = editorGroups.find(g => g.containsPreview(resource)) ||
                editorGroups.find(g => !this.isActiveGroup(g)) || // open with any non active group
                this.createGroup(); // open with a new group
        } else if (options.openToSide) {
            group = this.createGroup();
        } else {
            group =
                options.openInGroup ||
                editorGroups.find(g => g.contains(resource)) || // open with an existing group containing the resource
                this.activeGroup || // open with the active group
                editorGroups.find(_ => true) || // open with any group
                this.createGroup(); // open with a new group
        }

        this.groups.set(group.id, group);
        this.editorGroups$.next(this.listGroups());

        this.willOpen.next(resource);

        let title = options.title || Paths.basename(resource.path);
        if (options?.preview) {
            title = 'Preview: ' + title;
        }

        let icon = options.icon;
        if (!icon && options.preview) {
            icon = new CodIcon('preview');
        }

        return group.open(resource, {
            ...options,
            icon,
            title,
            tooltip: resource.path,
        });
    }

    /**
     * Closes the resource from all the editor groups.
     * @param resource the resource to close.
     * @param force When `true`, force close the resource without asking to save it if it is dirty.
     */
    async close(resource: URI, force?: boolean): Promise<any> {
        const groups = this.findGroups(group => group.contains(resource));
        return Promise.all(groups.map(g => g.close(resource, force)));
    }

    /**
     * Closes all the opened resources.
     * @param force When `true`, force close the resources without asking to save the dirty ones.
     */
    async closeAll(force?: boolean): Promise<void> {
        let groups = this.listGroups();
        while (groups.length !== 0) {
            await groups[0].closeAll(force);
            groups = this.listGroups();
        }

        this.editorGroups$.next(groups);

        this.state$.next({
            activeGroup: undefined,
            activeEditor: undefined,
            activeResource: undefined,
            visibleEditors: [],
        });
    }


    /**
     * Saves unsaved resources.
     */
    async saveAll(): Promise<any> {
        const changes: URI[] = [];
        this.listGroups().forEach(group => {
            group.tabs.forEach(tab => {
                if (this.fileService.isDirty(tab.resource)) {
                    changes.push(tab.resource);
                }

            });
        });
        return Promise.all(changes.map(r => this.save(r)));
    }

    /**
     * Saves the current active resource on the disk if it's exists.
     */
    async saveActiveResource(): Promise<void> {
        if (this.activeResource) {
            this.save(this.activeResource);
        }
    }

    private async save(resource: URI): Promise<void> {
        await this.fileService.save(resource);
    }

    private async closeGuard(
        _: EditorGroup,
        resource: URI
    ): Promise<boolean> {
        const shouldConfirm = (
            this.fileService.isDirty(resource) &&
            this.findGroups(group => group.contains(resource)).length === 1
        );
        const options: ConfirmOptions = {
            title: `Voulez-vous fermer le fichier "${Paths.basename(resource.path)}"?`,
            message: 'Vos modifications seront perdues si vous ne les enregistrez pas.',
            buttons: [{ id: 'dontsave', title: 'Ne pas sauvegarder', role: 'custom' }],
            okTitle: 'Sauvegarder',
            noTitle: 'Annuler'
        };

        let choice: any = false;
        if (!shouldConfirm || (choice = await this.dialogService.confirmAsync(options))) {
            if (choice === true) {
                await this.save(resource);
            }
            return true;
        }
        return false;
    }

    private openHandler(
        group: EditorGroup,
        editor: Editor,
        resource: URI,
    ): void {
        this.groups.set(group.id, group);
        this.editorGroups$.next(this.listGroups());
        this.state$.next({
            activeGroup: group,
            activeEditor: editor,
            activeResource: resource,
            visibleEditors: this.editorGroups$.value.map(g => g.activeEditor as any).filter(e => !!e)
        });
        this.didOpen.next(resource);
    }

    private closeHandler(
        group: EditorGroup,
        resource: URI,
        isPreview?: boolean
    ): void {
        if (group.isEmpty) {
            this.groups.delete(group.id);
        }

        if (!isPreview && !this.isOpened(resource)) {
            this.fileService.close(resource);
        }

        this.editorGroups$.next(this.listGroups());

        this.state$.next({
            activeGroup: undefined,
            activeEditor: undefined,
            activeResource: undefined,
            visibleEditors: []
        });

        if (group.isEmpty) {
            const randomGroup = this.findGroup(g => !g.isEmpty);
            if (randomGroup) {
                this.setActiveGroup(randomGroup);
            }
        }
    }

    private createGroup(): EditorGroup {
        return new EditorGroup(
            this.injector,
            this.openHandler.bind(this),
            this.closeHandler.bind(this),
            this.closeGuard.bind(this),
            // important to clone to allow multiple instances of the same editor type
            this.editors.map(editor => new (editor as any).constructor()),
        );
    }

    private listGroups(): EditorGroup[] {
        return Array.from(this.groups.values());
    }

}
