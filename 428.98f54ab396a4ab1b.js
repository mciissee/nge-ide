"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[428],{8428:(h,a,o)=>{o.r(a),o.d(a,{PreviewEditorModule:()=>r});var c=o(6895),d=o(6001),p=o(108),e=o(4650);function v(t,n){if(1&t&&(e.TgZ(0,"div",5),e._UZ(1,"iframe",6),e.ALo(2,"safe"),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("src",e.xi3(2,1,i.preview.data,"url"),e.uOi)}}function w(t,n){if(1&t&&(e.TgZ(0,"div",5),e._UZ(1,"iframe",7),e.ALo(2,"safe"),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("srcdoc",e.xi3(2,1,i.preview.data,"html"),e.oJD)}}function g(t,n){if(1&t&&(e.TgZ(0,"div",5),e._UZ(1,"nge-markdown",8),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("data",i.preview.data)}}function m(t,n){1&t&&(e.TgZ(0,"div",5)(1,"div",9),e._uU(2,"NO PREVIEW"),e.qZA()())}function f(t,n){if(1&t&&(e.ynx(0)(1,2),e.YNc(2,v,3,4,"div",3),e.YNc(3,w,3,4,"div",3),e.YNc(4,g,2,1,"div",3),e.YNc(5,m,3,0,"div",4),e.BQk()()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngSwitch",i.preview.type),e.xp6(1),e.Q6J("ngSwitchCase","URL"),e.xp6(1),e.Q6J("ngSwitchCase","HTML"),e.xp6(1),e.Q6J("ngSwitchCase","MARKDOWN")}}function l(t,n){1&t&&(e.TgZ(0,"div",9),e._uU(1,"NO PREVIEW"),e.qZA())}class s{constructor(n){this.changeDetectorRef=n,this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.editor.onChangeRequest.subscribe(n=>{this.preview=n.options?.preview,this.changeDetectorRef.markForCheck()}))}ngOnDestroy(){this.subscriptions.forEach(n=>n.unsubscribe())}}s.\u0275fac=function(n){return new(n||s)(e.Y36(e.sBO))},s.\u0275cmp=e.Xpm({type:s,selectors:[["ide-preview-editor"]],inputs:{editor:"editor"},decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["noPreview",""],[3,"ngSwitch"],["class","preview-editor",4,"ngSwitchCase"],["class","preview-editor",4,"ngSwitchDefault"],[1,"preview-editor"],["frameborder","0",3,"src"],["frameborder","0",3,"srcdoc"],[3,"data"],[1,"center"]],template:function(n,i){if(1&n&&(e.YNc(0,f,6,4,"ng-container",0),e.YNc(1,l,2,0,"ng-template",null,1,e.W1O)),2&n){const u=e.MAs(2);e.Q6J("ngIf",i.preview)("ngIfElse",u)}},dependencies:[c.O5,c.RF,c.n9,c.ED,d.NgeMarkdownComponent,p.yl],styles:[".preview-editor[_ngcontent-%COMP%]{height:100%;width:100%;overflow:auto;padding:8px;position:relative}iframe[_ngcontent-%COMP%]{width:100%;height:100%}.center[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"],changeDetection:0});class r{constructor(){this.component=s}}r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[c.ez,p.ZZ,d.NgeMarkdownModule]})}}]);