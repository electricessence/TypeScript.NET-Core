!function(t,e){if("object"==typeof module&&"object"==typeof module.exports){var i=e(require,exports);void 0!==i&&(module.exports=i)}else"function"==typeof define&&define.amd&&define(t,e)}(["require","exports","./TimeUnit","./TimeQuantity","../../extends"],function(t,e){"use strict";function i(t,e){return n.TimeUnit.fromMilliseconds(t.getTotalMilliseconds(),e)}/*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
var n=t("./TimeUnit"),o=t("./TimeQuantity"),u=t("../../extends"),r=u["default"],s=function(t){function e(e,o){var u=t.call(this,"number"==typeof e?e:i(e,o))||this;return u._units=o,n.TimeUnit.assertValid(o),u}return r(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._quantity},set:function(t){this._total=null,this._quantity=t},enumerable:!0,configurable:!0}),e.prototype.getTotalMilliseconds=function(){return n.TimeUnit.toMilliseconds(this._quantity,this._units)},Object.defineProperty(e.prototype,"units",{get:function(){return this._units},enumerable:!0,configurable:!0}),e.prototype.to=function(t){return void 0===t&&(t=this.units),e.from(this,t)},e.from=function(t,i){return void 0===i&&(i=n.TimeUnit.Milliseconds),new e(t,i)},e}(o.TimeQuantity);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=s});
//# sourceMappingURL=TimeUnitValue.js.map