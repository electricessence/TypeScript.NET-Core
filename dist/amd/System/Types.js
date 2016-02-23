///<reference path="Primitive.d.ts"/>
///<reference path="Collections/Array/IArray.d.ts"/>
"use strict";define(["require","exports"],function(e,i){var t=void 0,r=typeof!0,n="number",s="string",u=typeof{},o=typeof t,a="function",f={},c=function(){function e(e){var i=this;switch(i.isBoolean=!1,i.isNumber=!1,i.isString=!1,i.isTrueNaN=!1,i.isObject=!1,i.isFunction=!1,i.isUndefined=!1,i.isNull=!1,i.isPrimitive=!1,i.type=typeof e){case r:i.isBoolean=!0,i.isPrimitive=!0;break;case n:i.isNumber=!0,i.isTrueNaN=isNaN(e),i.isFinite=isFinite(e),i.isValidNumber=!i.isTrueNaN,i.isPrimitive=!0;break;case s:i.isString=!0,i.isPrimitive=!0;break;case u:i.target=e,null===e?(i.isNull=!0,i.isNullOrUndefined=!0,i.isPrimitive=!0):i.isObject=!0;break;case a:i.target=e,i.isString=!0;break;case o:i.isUndefined=!0,i.isNullOrUndefined=!0,i.isPrimitive=!0;break;default:throw"Fatal type failure.  Unknown type: "+i.type}Object.freeze(i)}return e.prototype.member=function(i){var t=this.target;return e.getFor(t&&i in t?t[i]:void 0)},e.getFor=function(i){var t=typeof i;switch(t){case u:case a:return new e(i)}var r=f[t];return r||(f[t]=r=new e(i)),r},e}();i.TypeInfo=c;var N;!function(e){function i(e){return typeof e===r}function f(e,i){return i===t&&(i=!0),typeof e===n&&(i||!isNaN(e))}function N(e){return typeof e===n&&isNaN(e)}function l(e){return typeof e===s}function p(e){var i=typeof e;switch(i){case r:case s:case n:case o:return!0;case u:return null===e}return!1}function y(e){return typeof e===a}function b(e){return typeof e===u}function m(e){return isNaN(e)?NaN:e}function v(e){return c.getFor(e)}function d(e,i){return e&&!p(e)&&i in e}function O(e,i,t){return d(e,i)&&typeof e[i]===t}function g(e){return e instanceof Array||d(e,"length")}e.BOOLEAN=r,e.NUMBER=n,e.STRING=s,e.OBJECT=u,e.UNDEFINED=o,e.FUNCTION=a,e.isBoolean=i,e.isNumber=f,e.isTrueNaN=N,e.isString=l,e.isPrimitive=p,e.isFunction=y,e.isObject=b,e.numberOrNaN=m,e.of=v,e.hasMember=d,e.hasMemberOfType=O,e.isArrayLike=g}(N||(N={})),Object.freeze(N),Object.defineProperty(i,"__esModule",{value:!0}),i["default"]=N});
//# sourceMappingURL=Types.js.map
