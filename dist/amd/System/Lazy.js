/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports","./Disposable/DisposableBase","./Exceptions/ArgumentNullException"],function(e,t,r,o){"use strict";var n=function(e){function t(t){if(e.call(this),this._closure=t,!t)throw new o.ArgumentNullException("_closure");this._disposableObjectName="Lazy"}return __extends(t,e),Object.defineProperty(t.prototype,"isValueCreated",{get:function(){return this._isValueCreated},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"error",{get:function(){return this._error},enumerable:!0,configurable:!0}),t.prototype.getValue=function(){var e=this;e.throwIfDisposed();try{if(!e._isValueCreated&&e._closure){var t=e._closure();return e._value=t,e._error=void 0,t}}catch(r){throw e._error=r,r}finally{e._onValueRequested(),e._isValueCreated=!0}return e._value},t.prototype._onValueRequested=function(){this._closure=null},t.prototype._onDispose=function(){this._closure=null,this._value=null},t.prototype.equals=function(e){return this==e},t.prototype.valueEquals=function(e){return this.equals(e)||this.value===e.value},t}(r.DisposableBase);t.Lazy=n;var u=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getValue=function(t){var r=e.prototype.getValue.call(this);return t&&e.prototype._onValueRequested.call(this),r},t.prototype._onValueRequested=function(){},Object.defineProperty(t.prototype,"canReset",{get:function(){return!this.wasDisposed&&!!this._closure},enumerable:!0,configurable:!0}),t.prototype.reset=function(e){var t=this;if(e&&t.throwIfDisposed(),t._closure)return t._isValueCreated=!1,t._value=null,t._error=void 0,!0;if(e)throw new Error("Cannot reset.  This Lazy has already de-referenced its closure.");return!1},t}(n);t.ResettableLazy=u,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n});
//# sourceMappingURL=Lazy.js.map