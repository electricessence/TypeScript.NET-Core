///<reference path="ITimeMeasurement.d.ts"/>
///<reference path="ITimeQuantity.d.ts"/>
///<reference path="../IEquatable.d.ts"/>
///<reference path="../IComparable.d.ts"/>
///<reference path="../IFormattable.d.ts"/>
///<reference path="../IFormatProvider.d.ts"/>
///<reference path="ITimeStamp.d.ts"/>
///<reference path="HowMany.ts"/>
"use strict";var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var n=t(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","./TimeQuantity"],function(e,t){function n(e,t){return 1!==Math.abs(e)&&(t+="s"),t}var o=e("./TimeQuantity"),i=function(e){function t(){for(var n=[],o=0;o<arguments.length;o++)n[o-0]=arguments[o];e.call(this,n.length>1?t.millisecondsFromTime(n[0]||0,n[1]||0,n.length>2&&n[2]||0,n.length>3&&n[3]||0):n.length>0&&n[0]||0);var i=this,r=Math.abs(i.getTotalMilliseconds()),u=Math.floor(r);i.tick=1e4*(r-u),i.days=u/864e5|0,u-=864e5*i.days,i.hour=u/36e5|0,u-=36e5*i.hour,i.minute=u/6e4|0,u-=6e4*i.minute,i.second=u/1e3|0,u-=1e3*i.second,i.millisecond=u,Object.freeze(i)}return __extends(t,e),t.from=function(e,n,o,i){return void 0===o&&(o=0),void 0===i&&(i=0),new t(e,n,o,i)},t.millisecondsFromTime=function(e,t,n,o){void 0===n&&(n=0),void 0===o&&(o=0);var i=e;return i*=60,i+=t,i*=60,i+=n,i*=1e3,i+=o},t.prototype.toString=function(){var e=this,t=[];return e.days&&t.push(n(e.days,"day")),e.hour&&t.push(n(e.hour,"hour")),e.minute&&t.push(n(e.minute,"minute")),e.second&&t.push(n(e.second,"second")),t.length>1&&t.splice(t.length-1,0,"and"),t.join(", ").replace(", and, "," and ")},t}(o["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i});
//# sourceMappingURL=ClockTime.js.map
