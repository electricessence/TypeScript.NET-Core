///<reference path="ILazy.d.ts"/>
///<reference path="FunctionTypes.d.ts"/>
"use strict";var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var r=t(require,exports);void 0!==r&&(module.exports=r)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","./Disposable/DisposableBase"],function(e,t){var r=e("./Disposable/DisposableBase"),o=function(e){function t(t){e.call(this),this._closure=t,this._disposableObjectName="Lazy"}return __extends(t,e),Object.defineProperty(t.prototype,"isValueCreated",{get:function(){return this._isValueCreated},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canReset",{get:function(){return!this.wasDisposed&&!!this._closure},enumerable:!0,configurable:!0}),t.prototype.reset=function(e){var t=this;if(e&&t.throwIfDisposed(),t._closure)return t._isValueCreated=!1,t._value=null,!0;if(e)throw new Error("Cannot reset.  This Lazy has already de-referenced its closure.");return!1},Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),t.prototype.getValue=function(e){var t=this;t.throwIfDisposed();try{if(!t._isValueCreated&&t._closure){var r=t._closure();return t._value=r,t._isValueCreated=!0,r}}finally{e&&(t._closure=null)}return t._value},t.prototype._onDispose=function(){this._closure=null,this._value=null},t.prototype.equals=function(e){return this==e},t.prototype.valueEquals=function(e){return this.equals(e)||this.value===e.value},t}(r["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o});
//# sourceMappingURL=Lazy.js.map
