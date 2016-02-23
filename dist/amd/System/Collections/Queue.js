"use strict";define(["require","exports","../Compare","./Array/Utility","../Types","../Integer","./Enumeration/EnumeratorBase","./Enumeration/forEach","../Exceptions/NotImplementedException","../Exceptions/InvalidOperationException","../Exceptions/ArgumentOutOfRangeException"],function(e,t,r,i,a,n,o,u,c,s,p){function _(e,t){if(0>e)throw new p["default"](t,e,"Must be greater than zero")}function y(e,t){n["default"].assert(e,t),_(e,t)}var l=4,f=32,d=100,h=l,v=[],m=function(){function e(e){var t=this;if(t._head=0,t._tail=0,t._size=0,t._version=0,e)if(a["default"].isNumber(e)){var r=e;y(r,"capacity"),t._array=r?i.initialize(r):v}else{var n=e;t._array=i.initialize(a["default"].isArrayLike(n)?n.length:h),u["default"](n,function(e){return t.enqueue(e)}),t._version=0}else t._array=v;t._capacity=t._array.length}return Object.defineProperty(e.prototype,"count",{get:function(){return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),e.prototype.add=function(e){this.enqueue(e)},e.prototype.clear=function(){var e=this,t=e._array,r=e._head,a=e._tail,n=e._size;return a>r?i.clear(t,r,n):(i.clear(t,r,t.length-r),i.clear(t,0,a)),e._head=0,e._tail=0,e._size=0,e._version++,e.trimExcess(),n},e.prototype.dump=function(e){if(void 0===e&&(e=1/0),a["default"].isNumber(e,!1)&&0>e)throw new p["default"]("max",e,"must be greater than or equal to 0.");var t=this,r=[];if(isFinite(e))for(n["default"].assert(e,"max");e--&&t._size;)r.push(t.dequeue());else for(;t._size;)r.push(t.dequeue());return t.trimExcess(),r},e.prototype.contains=function(e){for(var t=this,i=t._array,a=t._head,n=t._size,o=t._capacity;n-->0;){if(r.areEqual(i[a],e))return!0;a=(a+1)%o}return!1},e.prototype.copyTo=function(e,t){if(void 0===t&&(t=0),null==e)throw new Error("ArgumentNullException: array cannot be null.");y(t,"arrayIndex");var r=this,a=r._size;if(a){var n=a,o=r._array,u=r._capacity,c=r._head,s=u-c,p=a>s?s:a;return i.copyTo(o,e,c,t,p),n-=p,n>0&&i.copyTo(o,e,0,t+u-c,n),e}},e.prototype.toArray=function(){var e=this,t=e._size,r=i.initialize(t);return t?e.copyTo(r):r},e.prototype.remove=function(e){throw new c["default"]("ICollection<T>.remove is not implemented in Queue<T> since it would require destroying the underlying array to remove the item.")},e.prototype.dispose=function(){var e=this;e.clear(),e._array!=v&&(e._array.length=e._capacity=0,e._array=v),e._version=0},e.prototype.forEach=function(e){for(var t=this,r=t.toArray(),i=t._size,a=0;i>a&&e(r[a],a)!==!1;a++);},e.prototype.setCapacity=function(e){y(e,"capacity");var t=this,r=t._array,a=t._capacity;if(e!=a){var n=t._head,o=t._tail,u=t._size;if(r!=v&&e>a&&o>n)return r.length=t._capacity=e,void t._version++;var c=i.initialize(e);u>0&&(o>n?i.copyTo(r,c,n,0,u):(i.copyTo(r,c,n,0,a-n),i.copyTo(r,c,0,a-n,o))),t._array=c,t._capacity=e,t._head=0,t._tail=u==e?0:u,t._version++}},e.prototype.enqueue=function(e){var t=this,r=t._array,i=t._size,a=t._capacity;if(i==a){var n=a*d;a+l>n&&(n=a+l),t.setCapacity(n),r=t._array,a=t._capacity}var o=t._tail;r[o]=e,t._tail=(o+1)%a,t._size=i+1,t._version++},e.prototype.dequeue=function(e){void 0===e&&(e=!1);var t=this;if(0==t._size){if(e)throw new s["default"]("Cannot dequeue an empty queue.");return void 0}var r=t._array,i=t._head,a=t._array[i];return r[i]=null,t._head=(i+1)%t._capacity,t._size--,t._size<t._capacity/2&&t.trimExcess(f),t._version++,a},e.prototype.tryDequeue=function(e){if(!this._size)return!1;var t=this.dequeue();return e&&e(t),!0},e.prototype._getElement=function(e){y(e,"index");var t=this;return t._array[(t._head+e)%t._capacity]},e.prototype.peek=function(){if(0==this._size)throw new s["default"]("Cannot call peek on an empty queue.");return this._array[this._head]},e.prototype.trimExcess=function(e){var t=this,r=t._size;r<Math.floor(.9*t._capacity)&&(isNaN(e)||r>e)&&t.setCapacity(r)},e.prototype.getEnumerator=function(){var e,t,r=this;return new o["default"](function(){t=r._version,e=0},function(i){if(t!=r._version)throw new s["default"]("Collection was changed during enumeration.");return e==r._size?i.yieldBreak():i.yieldReturn(r._getElement(e++))})},e}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=m});
//# sourceMappingURL=Queue.js.map
