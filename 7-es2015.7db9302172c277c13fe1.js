(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"UD/E":function(e,t,n){"use strict";n.r(t),n.d(t,"MediaEditorModule",(function(){return b}));var i=n("An66"),o=n("l0rr"),c=n("kZht");function r(e,t){if(1&e&&(c.Ub(0),c.Rb(1,"img",4),c.Tb()),2&e){const e=c.ic();c.Cb(1),c.oc("src",e.url,c.zc)}}function s(e,t){if(1&e&&(c.Ub(0),c.Wb(1,"video",5),c.Rb(2,"source",4),c.Gc(3," Sorry, your browser doesn't support embedded videos. "),c.Vb(),c.Tb()),2&e){const e=c.ic();c.Cb(2),c.oc("src",e.url,c.zc)}}function a(e,t){if(1&e&&(c.Ub(0),c.Wb(1,"audio",5),c.Rb(2,"source",4),c.Gc(3," Sorry, your browser doesn't support embedded audio. "),c.Vb(),c.Tb()),2&e){const e=c.ic();c.Cb(2),c.oc("src",e.url,c.zc)}}function d(e,t){1&e&&(c.Ub(0),c.Wb(1,"h2"),c.Gc(2,"Unsupported media type"),c.Vb(),c.Tb())}let u=(()=>{class e{constructor(e,t){this.fileService=e,this.changeDetectorRef=t,this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.editor.onChangeRequest.subscribe(e=>{const t=this.fileService.find(e.uri);switch(this.url=null==t?void 0:t.downloadUrl,o.t.extname(e.uri.path)){case"svg":case"png":case"jpeg":case"gif":case"tiff":this.type="image";break;case"mov":case"mp4":case"mpeg":this.type="video";break;case"mpeg":case"wav":case"mp3":this.type="audio"}this.changeDetectorRef.markForCheck()}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}}return e.\u0275fac=function(t){return new(t||e)(c.Qb(o.m),c.Qb(c.h))},e.\u0275cmp=c.Kb({type:e,selectors:[["ide-media-editor"]],inputs:{editor:"editor"},decls:6,vars:4,consts:[[1,"media-editor"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[3,"src"],["controls",""]],template:function(e,t){1&e&&(c.Wb(0,"div",0),c.Ub(1,1),c.Ec(2,r,2,1,"ng-container",2),c.Ec(3,s,4,1,"ng-container",2),c.Ec(4,a,4,1,"ng-container",2),c.Ec(5,d,3,0,"ng-container",3),c.Tb(),c.Vb()),2&e&&(c.Cb(1),c.oc("ngSwitch",t.type),c.Cb(1),c.oc("ngSwitchCase","image"),c.Cb(1),c.oc("ngSwitchCase","video"),c.Cb(1),c.oc("ngSwitchCase","audio"))},directives:[i.m,i.n,i.o],styles:[".media-editor[_ngcontent-%COMP%]{height:100%;position:relative;background-position:0 0,10px 10px;background-size:20px 20px;background-image:linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0,#eee),linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0,#eee);display:flex;justify-content:center;align-items:center}.media-editor[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%], .media-editor[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100%;height:100%}.media-editor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .media-editor[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .media-editor[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{display:block;max-width:60%;max-height:60%;height:auto;margin:auto;border-radius:16px;background-color:transparent}"],changeDetection:0}),e})(),b=(()=>{class e{constructor(){this.component=u}}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(t){return new(t||e)},imports:[[i.c]]}),e})()}}]);