/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {Func} from "./FunctionTypes";
import Lazy from "./Lazy";

export default class ResettableLazy<T> extends Lazy<T>
{
	constructor(valueFactory:Func<T>, trapExceptions:boolean = false)
	{
		super(valueFactory, trapExceptions, true);
		// @ts-ignore // Force this override.
		this._disposableObjectName = 'ResettableLazy';
	}

	static create<T>(valueFactory:Func<T>, trapExceptions:boolean = false)
	{
		return new ResettableLazy<T>(valueFactory, trapExceptions);
	}
}