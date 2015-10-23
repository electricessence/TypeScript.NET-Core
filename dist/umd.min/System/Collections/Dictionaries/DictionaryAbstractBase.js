/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var n=t(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","../../Compare","../Enumeration/EnumeratorBase","../../Exceptions/NotImplementedException","../../Exceptions/ArgumentException","../../Exceptions/ArgumentNullException","../../Exceptions/InvalidOperationException"],function(e,t){function n(e,t){return void 0===t&&(t=""),console.log("DictionaryAbstractBase sub-class has not overridden "+e+". "+t),new a["default"]("DictionaryAbstractBase."+e+": Not implemented.")}var o=e("../../Compare"),r=e("../Enumeration/EnumeratorBase"),a=e("../../Exceptions/NotImplementedException"),u=e("../../Exceptions/ArgumentException"),i=e("../../Exceptions/ArgumentNullException"),p=e("../../Exceptions/InvalidOperationException"),c=function(){function e(){this._updateRecursion=0}return Object.defineProperty(e.prototype,"isUpdating",{get:function(){return 0!=this._updateRecursion},enumerable:!0,configurable:!0}),e.prototype._onValueUpdate=function(e,t,n){if(!o.areEqual(t,n,!0)){var r=this;r.onValueChanged&&r.onValueChanged(e,t,n),0==r._updateRecursion&&r._onUpdated()}},e.prototype._onUpdated=function(){var e=this;e.onUpdated&&e.onUpdated()},e.prototype.handleUpdate=function(e){var t,n=this;if(e){n._updateRecursion++;try{t=e()}finally{n._updateRecursion--}}else t=0==n._updateRecursion;return t&&0==n._updateRecursion&&n._onUpdated(),t},Object.defineProperty(e.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"count",{get:function(){throw n("count")},enumerable:!0,configurable:!0}),e.prototype.add=function(e){if(!e)throw new u["default"]("item","Dictionaries must use a valid key/value pair. '"+e+"' is not allowed.");this.addByKeyValue(e.key,e.value)},e.prototype.clear=function(){var e=this,t=e.keys,n=t.length;return n&&e.handleUpdate(function(){return t.forEach(function(t){e.removeByKey(t)}),!0}),0!=e.count&&console.warn("Dictionary clear() results in mismatched count."),n},e.prototype.contains=function(e){if(!e)return!1;var t=this.getValue(e.key);return o.areEqual(t,e.value)},e.prototype.copyTo=function(e,t){if(void 0===t&&(t=0),!e)throw new i["default"]("array");for(var n=this.getEnumerator();n.moveNext();)e[t++]=n.current;return e},e.prototype.toArray=function(){return this.copyTo([],0)},e.prototype.remove=function(e){if(!e)return 0;var t=e.key,n=this.getValue(t);return o.areEqual(n,e.value)&&this.removeByKey(t)?1:0},Object.defineProperty(e.prototype,"keys",{get:function(){throw n("keys")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"values",{get:function(){throw n("values")},enumerable:!0,configurable:!0}),e.prototype.addByKeyValue=function(e,t){var n=this;if(n.containsKey(e)){var o=new p["default"]("Adding a key/value when the key already exists.");throw o.data.key=e,o.data.value=t,o}n.setValue(e,t)},e.prototype.getValue=function(e){throw n("getValue(key: TKey): TValue","When calling for key: "+e)},e.prototype.setValue=function(e,t){throw n("setValue(key: TKey, value: TValue): boolean","When setting "+e+":"+t+".")},e.prototype.containsKey=function(e){var t=this.getValue(e);return void 0!==t},e.prototype.containsValue=function(e){for(var t=this.getEnumerator(),n=o.areEqual;t.moveNext();)if(n(t.current,e,!0))return t.dispose(),!0;return!1},e.prototype.removeByKey=function(e){return this.setValue(e,void 0)},e.prototype.removeByValue=function(e){var t=this,n=0,r=o.areEqual;return t.keys.forEach(function(o){r(t.getValue(o),e,!0)&&(t.removeByKey(o),++n)}),n},e.prototype.importPairs=function(e){var t=this;return t.handleUpdate(function(){var n=!1;return e.forEach(function(e){t.setValue(e.key,e.value),n=!0}),n})},e.prototype.getEnumerator=function(){var e,t,n=this,o=0;return new r["default"](function(){e=n.keys,t=e.length},function(r){for(;t>o;){var a=e[o++],u=n.getValue(a);if(void 0!==u)return r.yieldReturn({key:a,value:u})}return r.yieldBreak()})},e}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c});
//# sourceMappingURL=DictionaryAbstractBase.js.map
