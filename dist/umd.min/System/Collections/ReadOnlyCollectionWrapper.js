/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../Exceptions/ArgumentNullException","./ReadOnlyCollectionBase"],e)}(function(e,t){"use strict";var n=e("../Exceptions/ArgumentNullException"),o=e("./ReadOnlyCollectionBase"),r=function(e){function t(t){if(e.call(this),!t)throw new n["default"]("collection");var o=this;o._getCount=function(){return t.count},o.getEnumerator=function(){return t.getEnumerator()}}return __extends(t,e),t}(o["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r});
//# sourceMappingURL=ReadOnlyCollectionWrapper.js.map
