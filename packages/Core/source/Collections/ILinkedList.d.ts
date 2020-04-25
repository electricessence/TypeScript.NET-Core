/*!
 * @author electricessence / https://github.com/electricessence/
 * Based Upon: http://msdn.microsoft.com/en-us/library/he2s3bh7%28v=vs.110%29.aspx
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import {ICollection} from "./ICollection";
import {ILinkedListNode, ILinkedNode} from "./ILinkedListNode";
import {IEnumerateEach} from "./Enumeration/IEnumerateEach";

export interface ILinkedNodeList<TNode extends ILinkedNode<TNode>>
{
	first:TNode | undefined;
	last:TNode | undefined;

	getNodeAt(index:number):TNode | undefined;
	removeNode(node:TNode):boolean;
}

export interface ILinkedList<T>
extends ILinkedNodeList<ILinkedListNode<T>>,
	ICollection<T>,
	IEnumerateEach<T>
{
	first:ILinkedListNode<T> | undefined;
	last:ILinkedListNode<T> | undefined;

	getValueAt(index:number):T | undefined;
	find(entry:T):ILinkedListNode<T> | undefined;
	findLast(entry:T):ILinkedListNode<T> | undefined;
	addFirst(entry:T):void;
	addLast(entry:T):void;
	removeFirst():void;
	removeLast():void;
	addAfter(node:ILinkedListNode<T>, entry:T):void;

}

export default ILinkedList;