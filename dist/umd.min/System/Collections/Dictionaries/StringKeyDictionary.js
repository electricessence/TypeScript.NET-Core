///<reference path="IDictionary.d.ts"/>
/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)};!function(t,e){if("object"==typeof module&&"object"==typeof module.exports){var r=e(require,exports);void 0!==r&&(module.exports=r)}else"function"==typeof define&&define.amd&&define(t,e)}(["require","exports","../../Compare","./DictionaryAbstractBase"],function(t,e){var r=t("../../Compare"),n=t("./DictionaryAbstractBase"),o=function(t){function e(){t.apply(this,arguments),this._count=0,this._map={}}return __extends(e,t),e.prototype.containsKey=function(t){return t in this._map},e.prototype.containsValue=function(t){var e=this._map,n=r.areEqual;for(var o in e)if(e.hasOwnProperty(o)&&n(e[o],t))return!0;return!1},e.prototype.getValue=function(t){return this._map[t]},e.prototype.setValue=function(t,e){var r=this,n=r._map,o=n[t];return o!==e?(void 0===e?t in n&&(delete n[t],--r._count):(t in n||++r._count,n[t]=e),r._onValueUpdate(t,e,o),!0):!1},e.prototype.importMap=function(t){var e=this;return e.handleUpdate(function(){var r=!1;for(var n in t)t.hasOwnProperty(n)&&e.setValue(n,t[n])&&(r=!0);return r})},e.prototype.toMap=function(t){var e=this,r={};for(var n in e._map)if(e._map.hasOwnProperty(n)){var o=e._map[n];t&&(o=t(n,o)),void 0!==o&&(r[n]=o)}return r},Object.defineProperty(e.prototype,"keys",{get:function(){var t=this,e=[];for(var r in t._map)t._map.hasOwnProperty(r)&&e.push(r);return e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"values",{get:function(){var t=this,e=[];for(var r in t._map)t._map.hasOwnProperty(r)&&e.push(t._map[r]);return e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"count",{get:function(){return this._count},enumerable:!0,configurable:!0}),e}(n["default"]);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o});
//# sourceMappingURL=StringKeyDictionary.js.map
