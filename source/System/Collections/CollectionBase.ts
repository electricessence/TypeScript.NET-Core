/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

import {forEach} from "./Enumeration/Enumerator";
import {areEqual} from "../Compare";
import ArgumentNullException from "../Exceptions/ArgumentNullException";
import InvalidOperationException from "../Exceptions/InvalidOperationException";
import DisposableBase from "../Disposable/DisposableBase";
import ICollection from "./ICollection";
import {FiniteIEnumerator} from "./Enumeration/IEnumerator";
import IEnumerateEach from "./Enumeration/IEnumerateEach";
import {ActionWithIndex, EqualityComparison, PredicateWithIndex} from "../FunctionTypes";
import ArrayLikeWritable from "./Array/ArrayLikeWritable";
import FiniteEnumerableOrEnumerator from "./Enumeration/FiniteEnumerableOrEnumerator";

//noinspection SpellCheckingInspection
const
	NAME = "CollectionBase",
	CMDC = "Cannot modify a disposed collection.",
	CMRO = "Cannot modify a read-only collection.";
const
	LINQ_PATH = "../../System.Linq/Linq";

export abstract class CollectionBase<T>
	extends DisposableBase
	implements ICollection<T>, IEnumerateEach<T>
{

	protected constructor(
		source?:FiniteEnumerableOrEnumerator<T>,
		protected _equalityComparer:EqualityComparison<T> = areEqual)
	{
		super(NAME);
		this._importEntries(source);
		this._updateRecursion = 0;
		this._modifiedCount = 0;
		this._version = 0;
	}

	// noinspection JSMethodCanBeStatic
	get isEndless():false { return false; }

	protected abstract getCount():number;

	get count():number
	{
		return this.getCount();
	}

	protected getIsReadOnly():boolean
	{
		return false;
	}


	get isReadOnly():boolean
	{
		return this.getIsReadOnly();
	}

	protected assertModifiable():true | never
	{
		this.throwIfDisposed(CMDC);
		if(this.getIsReadOnly())
			throw new InvalidOperationException(CMRO);
		return true;
	}

	protected _version:number; // Provides an easy means of tracking changes and invalidating enumerables.


	protected assertVersion(version:number):true | never
	{
		if(version!==this._version)
			throw new InvalidOperationException("Collection was modified.");

		return true;
	}

	/*
	 * Note: Avoid changing modified count by any means but ++;
	 * If setting modified count by the result of a closure it may be a negative number or NaN and ruin the pattern.
	 */
	private _modifiedCount:number;
	private _updateRecursion:number;

	protected _onModified():void {}

	protected _signalModification(increment?:boolean):boolean
	{
		const _ = this;
		if(increment) _._modifiedCount++;
		if(_._modifiedCount && !this._updateRecursion)
		{
			_._modifiedCount = 0;
			_._version++;
			try
			{
				_._onModified();
			}
			catch(ex)
			{
				// Avoid fatal errors which may have been caused by consumer.
				console.error(ex);
			}
			return true;
		}
		return false;
	}

	protected _incrementModified():void { this._modifiedCount++; }


	get isUpdating():boolean { return this._updateRecursion!=0; }

	/**
	 * Takes a closure that if returning true will propagate an update signal.
	 * Multiple update operations can be occurring at once or recursively and the onModified signal will only occur once they're done.
	 * @param closure
	 * @returns {boolean}
	 */
	handleUpdate(closure?:() => boolean):boolean
	{
		if(!closure) return false;
		const _ = this;
		_.assertModifiable();
		_._updateRecursion++;
		let updated:boolean = false;

		try
		{
			updated = closure();
			if(updated)
				_._modifiedCount++;
		}
		finally
		{
			_._updateRecursion--;
		}

		_._signalModification();

		return updated;
	}

	protected abstract _addInternal(entry:T):boolean;

	/*
	 * Note: for a slight amount more code, we avoid creating functions/closures.
	 * Calling handleUpdate is the correct pattern, but if possible avoid creating another function scope.
	 */

	/**
	 * Adds an entry to the collection.
	 * @param entry
	 */
	add(entry:T):this
	{
		const _ = this;
		_.assertModifiable();
		_._updateRecursion++;

		try
		{ if(_._addInternal(entry)) _._modifiedCount++; }
		finally
		{ _._updateRecursion--; }

		_._signalModification();

		return _;
	}

	protected abstract _removeInternal(entry:T, max?:number):number;

	/**
	 * Removes entries from the collection allowing for a limit.
	 * For example if the collection not a distinct set, more than one entry could be removed.
	 * @param entry The entry to remove.
	 * @param max Limit of entries to remove.  Will remove all matches if no max specified.
	 * @returns {number} The number of entries removed.
	 */
	remove(entry:T, max:number = Infinity):number
	{
		const _ = this;
		_.assertModifiable();
		_._updateRecursion++;

		let n:number = NaN;
		try
		{
			n = _._removeInternal(entry, max);
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();
		return n;
	}

	protected abstract _clearInternal():number;

	/**
	 * Clears the contents of the collection resulting in a count of zero.
	 * @returns {number}
	 */
	clear():number
	{
		const _ = this;
		_.assertModifiable();
		_._updateRecursion++;

		let n:number = NaN;
		try
		{
			n = _._clearInternal();
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();

		return n;
	}

	protected _onDispose():void
	{
		super._onDispose();
		this._clearInternal();
		this._version = 0;
		this._updateRecursion = 0;
		this._modifiedCount = 0;
	}

	protected _importEntries(entries:FiniteEnumerableOrEnumerator<T> | null | undefined):number
	{
		let added = 0;
		if(entries)
		{
			if((entries) instanceof (Array))
			{
				// Optimize for avoiding a new closure.
				for(let e of entries)
				{
					if(this._addInternal(e)) added++;
				}
			}
			else
			{
				forEach(entries, e => {
					if(this._addInternal(e)) added++;
				});
			}
		}
		return added;
	}

	/**
	 * Safely imports any array enumerator, or enumerable.
	 * @param entries
	 * @returns {number}
	 */
	importEntries(entries:FiniteEnumerableOrEnumerator<T>):number
	{
		const _ = this;
		if(!entries) return 0;
		_.assertModifiable();
		_._updateRecursion++;

		let n:number = NaN;
		try
		{
			n = _._importEntries(entries);
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();
		return n;
	}

	// Fundamentally the most important part of the collection.

	/**
	 * Returns a enumerator for this collection.
	 */
	abstract getEnumerator():FiniteIEnumerator<T>;

	/**
	 * Returns an array filtered by the provided predicate.
	 * Provided for similarity to JS Array.
	 * @param predicate
	 * @returns {[]}
	 */
	filter(predicate:PredicateWithIndex<T>):T[]
	{
		if(!predicate) throw new ArgumentNullException('predicate');
		let count = !this.getCount();
		let result:T[] = [];
		if(count)
		{
			this.forEach((e, i) => {
				if(predicate(e, i))
					result.push(e);
			});
		}
		return result;
	}

	/**
	 * Returns true the first time predicate returns true.  Otherwise false.
	 * Useful for searching through a collection.
	 * @param predicate
	 * @returns {any}
	 */
	any(predicate?:PredicateWithIndex<T>):boolean
	{
		let count = this.getCount();
		if(!count) return false;
		if(!predicate) return Boolean(count);

		let found:boolean = false;
		this.forEach((e, i) => !(found = predicate(e, i)));
		return found;
	}

	/**
	 * Returns true the first time predicate returns true.  Otherwise false.
	 * See '.any(predicate)'.  As this method is just just included to have similarity with a JS Array.
	 * @param predicate
	 * @returns {any}
	 */
	some(predicate?:PredicateWithIndex<T>):boolean
	{
		return this.any(predicate);
	}


	/**
	 * Returns true if the equality comparer resolves true on any element in the collection.
	 * @param entry
	 * @returns {boolean}
	 */
	contains(entry:T):boolean
	{
		const equals = this._equalityComparer;
		return this.any(e => equals(entry, e));
	}


	/**
	 * Special implementation of 'forEach': If the action returns 'false' the enumeration will stop.
	 * @param action
	 * @param useCopy
	 */
	forEach(action:ActionWithIndex<T>, useCopy?:boolean):number
	forEach(action:PredicateWithIndex<T>, useCopy?:boolean):number
	forEach(action:ActionWithIndex<T> | PredicateWithIndex<T>, useCopy?:boolean):number
	{
		if(this.wasDisposed)
			return 0;

		if(useCopy)
		{
			const a = this.toArray();
			try
			{
				return forEach(a, action);
			}
			finally
			{
				a.length = 0;
			}
		}
		else
		{
			return forEach(this.getEnumerator(), action);
		}
	}

	/**
	 * Copies all values to numerically indexable object.
	 * @param target
	 * @param index
	 * @returns {TTarget}
	 */
	copyTo<TTarget extends ArrayLikeWritable<T>>(
		target:TTarget,
		index:number = 0):TTarget
	{
		if(!target) throw new ArgumentNullException('target');

		const count = this.getCount();
		if(count)
		{
			const newLength = count + index;
			if(target.length<newLength) target.length = newLength;

			const e = this.getEnumerator();
			while(e.moveNext()) // Disposes when finished.
			{
				target[index++] = <any>e.current;
			}
		}
		return target;
	}

	/**
	 * Returns an array of the collection contents.
	 * @returns {any[]|Array}
	 */
	toArray():T[]
	{
		const count = this.getCount();
		return count
			? this.copyTo(count>65536 ? new Array<T>(count) : [])
			: [];
	}
}

export default CollectionBase