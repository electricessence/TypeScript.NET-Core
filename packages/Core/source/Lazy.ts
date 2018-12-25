/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import ILazy from "./ILazy";
import {Func} from "./FunctionTypes";
import ResolverBase from "./ResolverBase";


// We need a non-resettable lazy to ensure it can be passed safely around.
export default class Lazy<T> extends ResolverBase<T> implements ILazy<T>
{

	constructor(valueFactory:Func<T>, trapExceptions:boolean = false, allowReset:boolean = false)
	{
		super(valueFactory, trapExceptions, allowReset);
		// @ts-ignore // Force this override.
		this._disposableObjectName = 'Lazy';
		this._isValueCreated = false;
	}

	get isValueCreated():boolean
	{
		return !!this._isValueCreated;
	}

	get value():T
	{
		return this.getValue();
	}

	equals(other:Lazy<T>):boolean
	{
		return this==other;
	}

	valueEquals(other:Lazy<T>):boolean
	{
		return this.equals(other) || this.value===other.value;
	}

	static create<T>(valueFactory:Func<T>, trapExceptions:boolean = false, allowReset:boolean = false)
	{
		return new Lazy<T>(valueFactory, trapExceptions, allowReset);
	}

}