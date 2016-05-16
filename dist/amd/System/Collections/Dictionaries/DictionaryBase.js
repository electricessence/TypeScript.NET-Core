/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports","../../Compare","../Enumeration/Enumerator","../CollectionBase","../Enumeration/EnumeratorBase","../../Exceptions/ArgumentNullException","../../Exceptions/InvalidOperationException","../../KeyValueExtract"],function(e,t,r,n,o,a,u,i,l){"use strict";var s=void 0,f=function(e){function t(t){e.call(this,t)}return __extends(t,e),t.prototype._onValueModified=function(e,t,r){},t.prototype._addInternal=function(e){var t=this;if(!e)throw new u["default"]("item","Dictionaries must use a valid key/value pair. '"+e+"' is not allowed.");return l["default"](e,function(e,r){return t.addByKeyValue(e,r)})},t.prototype._clearInternal=function(){for(var e=this,t=0,r=0,n=e.keys;r<n.length;r++){var o=n[r];e.removeByKey(o)&&t++}return t},t.prototype.contains=function(e){var t=this;return e&&this.getCount()?l["default"](e,function(e,n){var o=t.getValue(e);return r.areEqual(n,o)}):!1},t.prototype._removeInternal=function(e){var t=this;return e?l["default"](e,function(e,n){var o=t.getValue(e);return r.areEqual(n,o)&&t.removeByKey(e)?1:0}):0},Object.defineProperty(t.prototype,"keys",{get:function(){return this.getKeys()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"values",{get:function(){return this.getValues()},enumerable:!0,configurable:!0}),t.prototype.addByKeyValue=function(e,t){if(t===s)throw new i["default"]("Cannot add 'undefined' as a value.");var r=this;if(r.containsKey(e)){var n=new i["default"]("Adding a key/value when the key already exists.");throw n.data.key=e,n.data.value=t,n}return r.setValue(e,t)},t.prototype.setValue=function(e,t){var n=this;n.assertModifiable();var o=!1,a=n.getValue(e);return!r.areEqual(t,a)&&n._setValueInternal(e,t)&&(o=!0,n._onValueModified(e,t,a)),n._signalModification(o),o},t.prototype.containsKey=function(e){return!!this._getEntry(e)},t.prototype.containsValue=function(e){for(var t=this.getEnumerator(),n=r.areEqual;t.moveNext();)if(n(t.current,e,!0))return t.dispose(),!0;return!1},t.prototype.removeByKey=function(e){return this.setValue(e,s)},t.prototype.removeByValue=function(e){for(var t=this,n=0,o=r.areEqual,a=0,u=t.getKeys();a<u.length;a++){var i=u[a];o(t.getValue(i),e,!0)&&(t.removeByKey(i),n++)}return n},t.prototype.importEntries=function(t){return e.prototype.importEntries.call(this,t)},t.prototype._importEntries=function(e){var t=this;if(!e)return 0;var r=0;return n.forEach(e,function(e){return l["default"](e,function(e,n){t._setValueInternal(e,n)&&r++})}),r},t.prototype.getEnumerator=function(){var e,t,r,n=this,o=0;return new a["default"](function(){e=n._version,t=n.getKeys(),r=t.length},function(a){for(n.assertVersion(e);r>o;){var u=t[o++],i=n.getValue(u);if(i!==s)return a.yieldReturn({key:u,value:i})}return a.yieldBreak()})},t}(o["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=f});
//# sourceMappingURL=DictionaryBase.js.map
