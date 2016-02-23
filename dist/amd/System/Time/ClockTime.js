///<reference path="ITimeMeasurement.d.ts"/>
///<reference path="ITimeQuantity.d.ts"/>
///<reference path="../IEquatable.d.ts"/>
///<reference path="../IComparable.d.ts"/>
///<reference path="../IFormattable.d.ts"/>
///<reference path="../IFormatProvider.d.ts"/>
///<reference path="ITimeStamp.d.ts"/>
///<reference path="HowMany.ts"/>
"use strict";var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","./TimeQuantity"],function(e,t,n){function o(e,t){return 1!==Math.abs(e)&&(t+="s"),t}var r=function(e){function t(){for(var n=[],o=0;o<arguments.length;o++)n[o-0]=arguments[o];e.call(this,n.length>1?t.millisecondsFromTime(n[0]||0,n[1]||0,n.length>2&&n[2]||0,n.length>3&&n[3]||0):n.length>0&&n[0]||0);var r=this,i=Math.abs(r.getTotalMilliseconds()),s=Math.floor(i);r.tick=1e4*(i-s),r.days=s/864e5|0,s-=864e5*r.days,r.hour=s/36e5|0,s-=36e5*r.hour,r.minute=s/6e4|0,s-=6e4*r.minute,r.second=s/1e3|0,s-=1e3*r.second,r.millisecond=s,Object.freeze(r)}return __extends(t,e),t.from=function(e,n,o,r){return void 0===o&&(o=0),void 0===r&&(r=0),new t(e,n,o,r)},t.millisecondsFromTime=function(e,t,n,o){void 0===n&&(n=0),void 0===o&&(o=0);var r=e;return r*=60,r+=t,r*=60,r+=n,r*=1e3,r+=o},t.prototype.toString=function(){var e=this,t=[];return e.days&&t.push(o(e.days,"day")),e.hour&&t.push(o(e.hour,"hour")),e.minute&&t.push(o(e.minute,"minute")),e.second&&t.push(o(e.second,"second")),t.length>1&&t.splice(t.length-1,0,"and"),t.join(", ").replace(", and, "," and ")},t}(n["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r});
//# sourceMappingURL=ClockTime.js.map
