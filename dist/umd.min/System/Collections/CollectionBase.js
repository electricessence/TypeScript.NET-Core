/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./Enumeration/Enumerator","../Compare","../Exceptions/ArgumentNullException","../Exceptions/InvalidOperationException","../Disposable/DisposableBase","../Environment","../../extends"],e)}(function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Enumerator_1=require("./Enumeration/Enumerator"),Compare_1=require("../Compare"),ArgumentNullException_1=require("../Exceptions/ArgumentNullException"),InvalidOperationException_1=require("../Exceptions/InvalidOperationException"),DisposableBase_1=require("../Disposable/DisposableBase"),Environment_1=require("../Environment"),extends_1=require("../../extends"),__extends=extends_1["default"],NAME="CollectionBase",CMDC="Cannot modify a disposed collection.",CMRO="Cannot modify a read-only collection.",LINQ_PATH="../../System.Linq/Linq",CollectionBase=function(_super){function CollectionBase(e,t){void 0===t&&(t=Compare_1.areEqual);var o=_super.call(this,NAME)||this;return o._equalityComparer=t,o._importEntries(e),o._updateRecursion=0,o._modifiedCount=0,o._version=0,o}return __extends(CollectionBase,_super),Object.defineProperty(CollectionBase.prototype,"count",{get:function(){return this.getCount()},enumerable:!0,configurable:!0}),CollectionBase.prototype.getIsReadOnly=function(){return!1},Object.defineProperty(CollectionBase.prototype,"isReadOnly",{get:function(){return this.getIsReadOnly()},enumerable:!0,configurable:!0}),CollectionBase.prototype.assertModifiable=function(){if(this.throwIfDisposed(CMDC),this.getIsReadOnly())throw new InvalidOperationException_1.InvalidOperationException(CMRO);return!0},CollectionBase.prototype.assertVersion=function(e){if(e!==this._version)throw new InvalidOperationException_1.InvalidOperationException("Collection was modified.");return!0},CollectionBase.prototype._onModified=function(){},CollectionBase.prototype._signalModification=function(e){var t=this;if(e&&t._modifiedCount++,t._modifiedCount&&!this._updateRecursion){t._modifiedCount=0,t._version++;try{t._onModified()}catch(o){console.error(o)}return!0}return!1},CollectionBase.prototype._incrementModified=function(){this._modifiedCount++},Object.defineProperty(CollectionBase.prototype,"isUpdating",{get:function(){return 0!=this._updateRecursion},enumerable:!0,configurable:!0}),CollectionBase.prototype.handleUpdate=function(e){if(!e)return!1;var t=this;t.assertModifiable(),t._updateRecursion++;var o=!1;try{(o=e())&&t._modifiedCount++}finally{t._updateRecursion--}return t._signalModification(),o},CollectionBase.prototype.add=function(e){var t=this;t.assertModifiable(),t._updateRecursion++;try{t._addInternal(e)&&t._modifiedCount++}finally{t._updateRecursion--}return t._signalModification(),t},CollectionBase.prototype.remove=function(e,t){void 0===t&&(t=1/0);var o=this;o.assertModifiable(),o._updateRecursion++;var i=NaN;try{(i=o._removeInternal(e,t))&&o._modifiedCount++}finally{o._updateRecursion--}return o._signalModification(),i},CollectionBase.prototype.clear=function(){var e=this;e.assertModifiable(),e._updateRecursion++;var t=NaN;try{(t=e._clearInternal())&&e._modifiedCount++}finally{e._updateRecursion--}return e._signalModification(),t},CollectionBase.prototype._onDispose=function(){_super.prototype._onDispose.call(this),this._clearInternal(),this._version=0,this._updateRecursion=0,this._modifiedCount=0;var e=this._linq;this._linq=void 0,e&&e.dispose()},CollectionBase.prototype._importEntries=function(e){var t=this,o=0;if(e)if(e instanceof Array)for(var i=0,n=e;i<n.length;i++){var r=n[i];this._addInternal(r)&&o++}else Enumerator_1.forEach(e,function(e){t._addInternal(e)&&o++});return o},CollectionBase.prototype.importEntries=function(e){var t=this;if(!e)return 0;t.assertModifiable(),t._updateRecursion++;var o=NaN;try{(o=t._importEntries(e))&&t._modifiedCount++}finally{t._updateRecursion--}return t._signalModification(),o},CollectionBase.prototype.filter=function(e){if(!e)throw new ArgumentNullException_1.ArgumentNullException("predicate");var t=!this.getCount(),o=[];return t&&this.forEach(function(t,i){e(t,i)&&o.push(t)}),o},CollectionBase.prototype.any=function(e){var t=this.getCount();if(!t)return!1;if(!e)return Boolean(t);var o=!1;return this.forEach(function(t,i){return!(o=e(t,i))}),o},CollectionBase.prototype.some=function(e){return this.any(e)},CollectionBase.prototype.contains=function(e){var t=this._equalityComparer;return this.any(function(o){return t(e,o)})},CollectionBase.prototype.forEach=function(e,t){if(this.wasDisposed)return 0;if(!t)return Enumerator_1.forEach(this.getEnumerator(),e);var o=this.toArray();try{return Enumerator_1.forEach(o,e)}finally{o.length=0}},CollectionBase.prototype.copyTo=function(e,t){if(void 0===t&&(t=0),!e)throw new ArgumentNullException_1.ArgumentNullException("target");var o=this.getCount();if(o){var i=o+t;e.length<i&&(e.length=i);for(var n=this.getEnumerator();n.moveNext();)e[t++]=n.current}return e},CollectionBase.prototype.toArray=function(){var e=this.getCount();return e?this.copyTo(e>65536?new Array(e):[]):[]},Object.defineProperty(CollectionBase.prototype,"linq",{get:function(){this.throwIfDisposed();var e=this._linq;if(!e){var r=void 0;try{r=eval("require")}catch(ex){}if(this._linq=e=r&&r(LINQ_PATH)["default"].from(this),!e)throw Environment_1.isRequireJS?"using .linq to load and initialize a LinqEnumerable is currently only supported within a NodeJS environment.\nImport System.Linq/Linq and use Enumerable.from(e) instead.\nYou can also preload the Linq module as a dependency or use .linqAsync(callback) for AMD/RequireJS.":"There was a problem importing System.Linq/Linq"}return e},enumerable:!0,configurable:!0}),CollectionBase.prototype.linqAsync=function(callback){var _this=this;this.throwIfDisposed();var e=this._linq;if(!e)if(Environment_1.isRequireJS)eval("require")([LINQ_PATH],function(t){if(e=_this._linq,e||(_this._linq=e=t["default"].from(_this)),!e)throw"There was a problem importing System.Linq/Linq";callback&&callback(e),callback=void 0});else{if(!Environment_1.isNodeJS||!Environment_1.isCommonJS)throw"Cannot find a compatible loader for importing System.Linq/Linq";e=this.linq}return e&&callback&&callback(e),e},CollectionBase}(DisposableBase_1.DisposableBase);exports.CollectionBase=CollectionBase});
//# sourceMappingURL=CollectionBase.js.map