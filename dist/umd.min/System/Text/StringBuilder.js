/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../Types"],t)}(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("../Types"),n="",o="\r\n",p=function(){function t(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._latest=null,this._partArray=[],this.appendThese(t)}return t.prototype.appendSingle=function(t){if(null!=t){var e=this;switch(e._latest=null,typeof t){case r.Type.OBJECT:case r.Type.FUNCTION:t=t.toString()}e._partArray.push(t)}},t.prototype.appendThese=function(t){var e=this;return t.forEach(function(t){return e.appendSingle(t)}),e},t.prototype.append=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.appendThese(t),this},t.prototype.appendLine=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.appendLines(t),this},t.prototype.appendLines=function(t){var e=this;return t.forEach(function(t){null!=t&&(e.appendSingle(t),e._partArray.push(o))}),e},Object.defineProperty(t.prototype,"isEmpty",{get:function(){return 0===this._partArray.length},enumerable:!0,configurable:!0}),t.prototype.toString=function(){var t=this._latest;return null==t&&(this._latest=t=this._partArray.join(n)),t},t.prototype.join=function(t){return this._partArray.join(t)},t.prototype.clear=function(){this._partArray.length=0,this._latest=null},t.prototype.dispose=function(){this.clear()},t}();e.StringBuilder=p,e["default"]=p});
//# sourceMappingURL=StringBuilder.js.map