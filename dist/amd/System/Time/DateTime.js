///<reference path='ITimeQuantity.d.ts'/>
///<reference path="ITimeStamp.d.ts"/>
///<reference path="IDateTime.d.ts"/>
///<reference path="Calendars.d.ts"/>
///<reference path="HowMany.ts"/>
"use strict";define(["require","exports","./ClockTime","./TimeSpan","./TimeStamp"],function(e,t,n,r,o){var i=function(){function e(t,n){void 0===t&&(t=new Date),void 0===n&&(n=1);var r=this;r._kind=n,t instanceof e?r._value=t.toJsDate():t instanceof Date?r._setJsDate(t):r._value=void 0===t?new Date:new Date(t)}return e.prototype.toJsDate=function(){return new Date(this._value.getTime())},e.prototype._setJsDate=function(e){this._time=null,this._value=new Date(e.getTime())},Object.defineProperty(e.prototype,"kind",{get:function(){return this._kind},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"year",{get:function(){return this._value.getFullYear()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"month",{get:function(){return this._value.getMonth()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"day",{get:function(){return this._value.getDate()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dayOfWeek",{get:function(){return this._value.getDay()},enumerable:!0,configurable:!0}),e.prototype.addMilliseconds=function(t){return t=t||0,new e(this._value.getTime()+t,this._kind)},e.prototype.addSeconds=function(e){return e=e||0,this.addMilliseconds(1e3*e)},e.prototype.addMinutes=function(e){return e=e||0,this.addMilliseconds(6e4*e)},e.prototype.addHours=function(e){return e=e||0,this.addMilliseconds(36e5*e)},e.prototype.addDays=function(e){return e=e||0,this.addMilliseconds(864e5*e)},e.prototype.addMonths=function(t){t=t||0;var n=this.toJsDate();return n.setMonth(n.getMonth()+t),new e(n,this._kind)},e.prototype.addYears=function(t){t=t||0;var n=this.toJsDate();return n.setFullYear(n.getFullYear()+t),new e(n,this._kind)},e.prototype.add=function(e){return this.addMilliseconds(e.getTotalMilliseconds())},e.prototype.subtract=function(e){return this.addMilliseconds(-e.getTotalMilliseconds())},e.prototype.timePassedSince=function(t){return e.between(t,this)},Object.defineProperty(e.prototype,"date",{get:function(){var t=this;return new e(new Date(t.year,t.month,t.day),t._kind)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"timeOfDay",{get:function(){var e=this,t=e._time;if(!t){var r=this._value;e._time=t=new n["default"](r.getHours(),r.getMinutes(),r.getSeconds(),r.getMilliseconds())}return t},enumerable:!0,configurable:!0}),e.prototype.toTimeStamp=function(){return o["default"].from(this)},Object.defineProperty(e,"now",{get:function(){return new e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"toUniversalTime",{get:function(){var t=this;if(1!=t._kind)return new e(t,t._kind);var n=t._value;return new e(new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds(),n.getUTCMilliseconds()),2)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"today",{get:function(){return e.now.date},enumerable:!0,configurable:!0}),Object.defineProperty(e,"tomorrow",{get:function(){var t=e.today;return t.addDays(1)},enumerable:!0,configurable:!0}),e.between=function(t,n){var o=t instanceof e?t._value:t,i=n instanceof e?n._value:n;return new r["default"](o.getTime()-i.getTime())},e.isLeapYear=function(e){return e%4==0&&e%100!=0||e%400==0},e.daysInMonth=function(e,t){return new Date(e,t+1,0).getDate()},e}();Object.freeze(i),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i});
//# sourceMappingURL=DateTime.js.map
