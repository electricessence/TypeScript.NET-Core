/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var n=t(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","../Time/TimeSpan"],function(e,t){var n=e("../Time/TimeSpan"),i=function(){function e(){this.reset()}return e.getTimestampMilliseconds=function(){return(new Date).getTime()},Object.defineProperty(e.prototype,"isRunning",{get:function(){return this._isRunning},enumerable:!0,configurable:!0}),e.startNew=function(){var t=new e;return t.start(),t},e.measure=function(t){var i=e.getTimestampMilliseconds();return t(),new n["default"](e.getTimestampMilliseconds()-i)},e.prototype.record=function(t){var n=e.measure(t);return this._elapsed+=n.milliseconds,n},e.prototype.start=function(){var t=this;t._isRunning||(t._startTimeStamp=e.getTimestampMilliseconds(),t._isRunning=!0)},e.prototype.stop=function(){var e=this;e._isRunning&&(e._elapsed+=e.currentLapMilliseconds,e._isRunning=!1)},e.prototype.reset=function(){var e=this;e._elapsed=0,e._isRunning=!1,e._startTimeStamp=NaN},e.prototype.lap=function(){var t=this;if(t._isRunning){var i=e.getTimestampMilliseconds(),r=t._startTimeStamp,s=i-r;return t._startTimeStamp=i,t._elapsed+=s,new n["default"](s)}return n["default"].zero},Object.defineProperty(e.prototype,"currentLapMilliseconds",{get:function(){return this._isRunning?e.getTimestampMilliseconds()-this._startTimeStamp:0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentLap",{get:function(){return this._isRunning?new n["default"](this.currentLapMilliseconds):n["default"].zero},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elapsedMilliseconds",{get:function(){var e=this,t=e._elapsed;return e._isRunning&&(t+=e.currentLapMilliseconds),t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elapsed",{get:function(){return new n["default"](this.elapsedMilliseconds)},enumerable:!0,configurable:!0}),e}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i});
//# sourceMappingURL=Stopwatch.js.map
