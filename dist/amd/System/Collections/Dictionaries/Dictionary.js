"use strict";var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)};define(["require","exports","../../Compare","../../Types","../../Functions","./DictionaryBase","../Enumeration/EnumeratorBase"],function(t,e,r,n,o,i,u){function a(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function s(t){return null===t?"null":t===l?"undefined":typeof t.toString===n["default"].FUNCTION?t.toString():Object.prototype.toString.call(t)}var l=void 0,p=function(){function t(t,e,r,n){this.key=t,this.value=e,this.prev=r,this.next=n}return t}(),c=function(){function t(t,e){this.first=t,this.last=e}return t.prototype.addLast=function(t){var e=this;null!=e.last?(e.last.next=t,t.prev=e.last,e.last=t):e.first=e.last=t},t.prototype.replace=function(t,e){var r=this;null!=t.prev?(t.prev.next=e,e.prev=t.prev):r.first=e,null!=t.next?(t.next.prev=e,e.next=t.next):r.last=e},t.prototype.remove=function(t){var e=this;null!=t.prev?t.prev.next=t.next:e.first=t.next,null!=t.next?t.next.prev=t.prev:e.last=t.prev},t.prototype.clear=function(){for(var t=this;t.last;)t.remove(t.last)},t.prototype.forEach=function(t){for(var e=this,r=e.first;r;)t(r),r=r.next},t}(),f=function(t){function e(e){void 0===e&&(e=o["default"].Identity),t.call(this),this.compareSelector=e,this._count=0,this._entries=new c,this._buckets={}}return __extends(e,t),e.prototype.setKV=function(t,e,n){var o,i=this,u=i._buckets,c=i._entries,f=i.compareSelector,v=f(t),h=s(v);if(a(u,h)){for(var y=r.areEqual,d=u[h],_=0;_<d.length;_++){var x=d[_];if(f(x.key)===v){if(!n)throw new Error("Key already exists.");var k=!y(x.value,e);return k&&(e===l?(c.remove(x),d.splice(_,1),d.length||delete u[h],--i._count):(o=new p(t,e),c.replace(x,o),d[_]=o),i._onValueUpdate(t,e,x.value)),k}}d.push(o=o||new p(t,e))}else{if(e===l){if(n)return!1;throw new Error("Cannot add 'undefined' value.")}u[h]=[o=new p(t,e)]}return++i._count,c.addLast(o),i._onValueUpdate(t,e,void 0),!0},e.prototype.addByKeyValue=function(t,e){this.setKV(t,e,!1)},e.prototype.getValue=function(t){var e=this._buckets,r=this.compareSelector,n=r(t),o=s(n);if(!a(e,o))return void 0;for(var i=e[o],u=0;u<i.length;u++){var l=i[u];if(r(l.key)===n)return l.value}return void 0},e.prototype.setValue=function(t,e){return this.setKV(t,e,!0)},e.prototype.containsKey=function(t){var e=this,r=e._buckets,n=e.compareSelector,o=n(t),i=s(o);if(!a(r,i))return!1;for(var u=r[i],l=0,p=u.length;p>l;l++)if(n(u[l].key)===o)return!0;return!1},e.prototype.clear=function(){var e=this,r=e._buckets,n=t.prototype.clear.call(this);e._count=0;for(var o in r)r.hasOwnProperty(o)&&delete r[o];return e._entries.clear(),n},e.prototype.getCount=function(){return this._count},e.prototype.getEnumerator=function(){var t,e=this;return new u["default"](function(){t=e._entries.first},function(e){if(null!=t){var r={key:t.key,value:t.value};return t=t.next,e.yieldReturn(r)}return e.yieldBreak()})},e.prototype.getKeys=function(){var t=this,e=[];return t._entries.forEach(function(t){return e.push(t.key)}),e},e.prototype.getValues=function(){var t=this,e=[];return t._entries.forEach(function(t){return e.push(t.value)}),e},e}(i["default"]);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=f});
//# sourceMappingURL=Dictionary.js.map
