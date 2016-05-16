/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Source: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../Collections/LinkedNodeList","../Disposable/dispose","./Subscription"],e)}(function(e,t){"use strict";var i=e("../Collections/LinkedNodeList"),n=e("../Disposable/dispose"),s=e("./Subscription"),o=function(){function e(){this.__subscriptions=new i["default"]}return e.prototype._getSubscribers=function(){return this.__subscriptions.map(function(e){return e.value&&e.value.subscriber})},e.prototype._findEntryNode=function(e){return this.__subscriptions.find(function(t){return t.value.subscriber===e})},e.prototype.subscribe=function(e){var t=this,i=t._findEntryNode(e);if(i)return i.value;var n=new s["default"](t,e);return t.__subscriptions.addNode({value:n}),n},e.prototype.unsubscribe=function(e){var t=this,i=t._findEntryNode(e);if(i){var n=i.value;t.__subscriptions.removeNode(i),n.dispose()}},e.prototype._unsubscribeAll=function(e){void 0===e&&(e=!1);var t=this,i=t.__subscriptions,s=i.map(function(e){return e.value}),o=e?s.map(function(e){return e.subscriber}):null;return i.clear(),n["default"].these(s),o},e.prototype.unsubscribeAll=function(){this._unsubscribeAll()},e.prototype.dispose=function(){this._unsubscribeAll()},e}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o});
//# sourceMappingURL=SubscribableBase.js.map
