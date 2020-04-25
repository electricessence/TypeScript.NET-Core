/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import {format} from "../Text/Utility";
import InvalidOperationException from "../Exceptions/InvalidOperationException";
import ArgumentException from "../Exceptions/ArgumentException";
import ArgumentNullException from "../Exceptions/ArgumentNullException";
import {FiniteEnumeratorBase} from "./Enumeration/EnumeratorBase";
import {ILinkedNode, ILinkedNodeWithValue} from "./ILinkedListNode";
import IEnumerateEach from "./Enumeration/IEnumerateEach";
import IDisposable from "../Disposable/IDisposable";
import {ILinkedNodeList} from "./ILinkedList";
import {FiniteIEnumerator} from "./Enumeration/IEnumerator";
import {ActionWithIndex, PredicateWithIndex, Selector, SelectorWithIndex} from "../FunctionTypes";
import ArrayLikeWritable from "./Array/ArrayLikeWritable";
import IRecyclable from "../Disposable/IRecyclable";
import Exception from "../Exception";

const VOID0:undefined = void 0;

/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/simulating-a-queue
 *
 * Adding to an array is very fast, but modifying is slow.
 * LinkedList wins when modifying contents.
 * http://stackoverflow.com/questions/166884/array-versus-linked-list
 *****************************/

/**
 * This class is useful for managing a list of linked nodes, but it does not protect against modifying individual links.
 * If the consumer modifies a link (sets the previous or next value) it will effectively break the collection.
 *
 * It is possible to declare a node type of any kind as long as it contains a previous and next value that can reference another node.
 * Although not as safe as the included LinkedList, this class has less overhead and is more flexible.
 *
 * The count (or length) of this LinkedNodeList is not tracked since it could be corrupted at any time.
 */
export class LinkedNodeList<TNode extends ILinkedNode<TNode>>
	implements ILinkedNodeList<TNode>, IEnumerateEach<TNode>, IDisposable, IRecyclable
{
	private _first:TNode | undefined;
	private _last:TNode | undefined;
	unsafeCount:number;

	constructor()
	{
		this.unsafeCount = 0;
		this._version = 0;
	}

	private _version:number;

	assertVersion(version:number):true | never
	{
		if(version!==this._version)
			throw new InvalidOperationException("Collection was modified.");
		return true;
	}

	/**
	 * The first node.  Will be null if the collection is empty.
	 */
	get first():TNode | undefined
	{
		return this._first;
	}

	/**
	 * The last node.
	 */
	get last():TNode | undefined
	{
		return this._last;
	}


	/**
	 * Iteratively counts the number of linked nodes and returns the value.
	 * @returns {number}
	 */
	get count():number
	{

		let next = this._first;

		let i:number = 0;
		while(next)
		{
			i++;
			next = next.next;
		}

		return i;
	}

	// Note, no need for 'useCopy' since this avoids any modification conflict.
	// If iterating over a arrayCopy is necessary, a arrayCopy should be made manually.
	forEach(
		action:ActionWithIndex<TNode>, ignoreVersion?:boolean):number
	forEach(
		action:PredicateWithIndex<TNode>, ignoreVersion?:boolean):number
	forEach(
		action:ActionWithIndex<TNode> | PredicateWithIndex<TNode>, ignoreVersion?:boolean):number
	{
		const _ = this;
		let current:TNode | undefined = VOID0,
		    next                      = _.first; // Be sure to track the next node so if current node is removed.

		const version = _._version;
		let index:number = 0;
		do
		{
			if(!ignoreVersion) _.assertVersion(version);
			current = next;
			next = current && current.next;
		}
		while(current
		&& <any>action(current, index++)!==false);

		return index;
	}

	map<T>(selector:Selector<TNode, T>):T[]
	map<T>(selector:SelectorWithIndex<TNode, T>):T[]
	map<T>(selector:SelectorWithIndex<TNode, T>):T[]
	{
		if(!selector) throw new ArgumentNullException('selector');

		const result:T[] = [];
		this.forEach((node, i) => {
			result.push(selector(node, i));
		});
		return result;
	}

	/**
	 * Erases the linked node's references to each other and returns the number of nodes.
	 * @returns {number}
	 */
	clear():number
	{
		let n = this._first;
		let cF:number = 0, cL:number = 0;

		// First, clear in the forward direction.
		this._first = VOID0;

		while(n)
		{
			cF++;
			let current = n;
			n = n.next;
			current.next = VOID0;
		}

		// Last, clear in the reverse direction.
		n = this._last;
		this._last = VOID0;

		while(n)
		{
			cL++;
			let current = n;
			n = n.previous;
			current.previous = VOID0;
		}

		if(cF!==cL) console.warn('LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: ' + cF + ", Reverse: " + cL);

		this._version++;
		this.unsafeCount = 0;

		return cF;
	}

	/**
	 * Clears the list.
	 */
	dispose():void
	{
		this.clear();
	}

	/**
	 * Clears the list.
	 */
	recycle():void
	{
		this.clear();
	}

	/**
	 * Iterates the list to see if a node exists.
	 * @param node
	 * @returns {boolean}
	 */
	contains(node:TNode):boolean
	{
		if(!node) throw new ArgumentNullException('node');
		return this.indexOf(node)!= -1;
	}


	/**
	 * Gets the index of a particular node.
	 * @param index
	 */
	getNodeAt(index:number):TNode | undefined
	{
		if(index<0)
			return VOID0;

		let next = this._first;

		let i:number = 0;
		while(next && i++<index)
		{
			next = next.next;
		}

		return next;

	}

	find(condition:PredicateWithIndex<TNode>):TNode | undefined
	{
		let node:TNode | undefined = VOID0;
		this.forEach((n, i) => {
			if(condition(n, i))
			{
				node = n;
				return false;
			}
		});
		return node;
	}

	/**
	 * Iterates the list to find the specified node and returns its index.
	 * @param node
	 * @returns {boolean}
	 */
	indexOf(node:TNode):number
	{
		if(node && (node.previous || node.next))
		{

			let index = 0;
			let c:TNode | undefined,
			    n = this._first;

			do
			{
				c = n;
				if(c===node) return index;
				index++;
			}
			while((n = c && c.next));
		}

		return -1;
	}

	/**
	 * Removes the specified node.
	 * Returns true if successful and false if not found (already removed).
	 * @param node
	 * @returns {boolean}
	 */
	removeNode(node:TNode):boolean
	{
		if(!node) throw new ArgumentNullException('node');

		const _ = this;
		const prev = node.previous,
		      next = node.next;

		let a:boolean = false,
		    b:boolean = false;

		if(prev) prev.next = next;
		else if(_._first==node) _._first = next;
		else a = true;

		if(next) next.previous = prev;
		else if(_._last==node) _._last = prev;
		else b = true;

		if(a!==b)
		{
			throw new ArgumentException(
				'node', format(
					"Provided node is has no {0} reference but is not the {1} node!",
					a ? "previous" : "next", a ? "first" : "last"
				)
			);
		}

		const removed = !a && !b;
		if(removed)
		{
			_._version++;
			_.unsafeCount--;
			node.previous = VOID0;
			node.next = VOID0;
		}
		return removed;

	}

	/**
	 * Removes the first node and returns it if successful.
	 */
	takeFirst():TNode | undefined
	{
		const node = this._first;
		if(!node) return VOID0;
		if(node.previous)
			throw new Exception("Collection is corrupted: first node has previous node.");
		if(!this.removeNode(node))
			throw new Exception("Collection is corrupted: unable to remove first node.");
		return node;
	}

	/**
	 * Removes the last node and returns it if successful.
	 */
	takeLast():TNode | undefined
	{
		const node = this._last;
		if(!node) return VOID0;
		if(node.next)
			throw new Exception("Collection is corrupted: last node has next node.");
		if(!this.removeNode(node))
			throw new Exception("Collection is corrupted: unable to remove last node.");
		return node;
	}

	/**
	 * Removes the first node and returns true if successful.
	 * @returns {boolean}
	 */
	removeFirst():boolean
	{
		return !!this.takeFirst();
	}

	/**
	 * Removes the last node and returns true if successful.
	 * @returns {boolean}
	 */
	removeLast():boolean
	{
		return !!this.takeLast();
	}

	/**
	 * Adds a node to the end of the list.
	 * @param node
	 * @returns {LinkedNodeList}
	 */
	addNode(node:TNode):this
	{
		this.addNodeAfter(node);
		return this;
	}

	/**
	 * Inserts a node before the specified 'before' node.
	 * If no 'before' node is specified, it inserts it as the first node.
	 * @param node
	 * @param before
	 * @returns {LinkedNodeList}
	 */
	addNodeBefore(node:TNode, before?:TNode):this
	{
		assertValidDetached(node);

		const _ = this;

		if(!before)
		{
			before = _._first;
		}

		if(before)
		{
			let prev = before.previous;
			node.previous = prev;
			node.next = before;

			before.previous = node;
			if(prev) prev.next = node;
			if(before==_._first) _._first = node;
		}
		else
		{
			_._first = _._last = node;
		}

		_._version++;
		_.unsafeCount++;

		return this;
	}

	/**
	 * Inserts a node after the specified 'after' node.
	 * If no 'after' node is specified, it appends it as the last node.
	 * @param node
	 * @param after
	 * @returns {LinkedNodeList}
	 */
	addNodeAfter(node:TNode, after?:TNode):this
	{
		assertValidDetached(node);
		const _ = this;

		if(!after)
		{
			after = _._last;
		}

		if(after)
		{
			let next = after.next;
			node.next = next;
			node.previous = after;

			after.next = node;
			if(next) next.previous = node;
			if(after==_._last) _._last = node;
		}
		else
		{
			_._first = _._last = node;
		}

		_._version++;
		_.unsafeCount++;

		return _;
	}

	/**
	 * Takes and existing node and replaces it.
	 * @param node
	 * @param replacement
	 * @returns {any}
	 */
	replace(node:TNode, replacement:TNode):this
	{
		if(node==replacement) return this;

		assertValidDetached(replacement, 'replacement');

		const _ = this;
		replacement.previous = node.previous;
		replacement.next = node.next;

		if(node.previous) node.previous.next = replacement;
		if(node.next) node.next.previous = replacement;

		if(node==_._first) _._first = replacement;
		if(node==_._last) _._last = replacement;

		_._version++;

		return _;
	}

	static valueEnumeratorFrom<T>(list:LinkedNodeList<ILinkedNodeWithValue<T>>):FiniteIEnumerator<T>
	{

		if(!list) throw new ArgumentNullException('list');

		let current:ILinkedNodeWithValue<T> | undefined,
		    next:ILinkedNodeWithValue<T> |  undefined,
		    version:number;

		return new FiniteEnumeratorBase<T>(
			() => {
				// Initialize anchor...
				next = list.first;
				version = list._version;
			},
			(yielder) => {
				if(next)
				{
					list.assertVersion(version);

					current = next;
					next = current && current.next;
					return yielder.yieldReturn(current.value);
				}

				return yielder.yieldBreak();
			}
		);
	}

	static copyValues<T, TDestination extends ArrayLikeWritable<any>>(
		list:LinkedNodeList<ILinkedNodeWithValue<T>>,
		array:TDestination,
		index:number = 0):TDestination
	{
		if(list && list.first)
		{
			if(!array) throw new ArgumentNullException('array');

			list.forEach(
				(node, i) => {
					array[index + i] = node.value;
				}
			);
		}

		return array;
	}

}

function assertValidDetached<TNode extends ILinkedNode<TNode>>(
	node:TNode,
	propName:string = 'node')
{
	if(!node)
		throw new ArgumentNullException(propName);

	if(node.next || node.previous)
		throw new InvalidOperationException("Cannot add a node to a LinkedNodeList that is already linked.");

}

export default LinkedNodeList;