/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import TaskHandlerBase from "./TaskHandlerBase";
import ArgumentNullException from "typescript-dotnet-core/Exceptions/ArgumentNullException";
import {Closure} from "typescript-dotnet-core/FunctionTypes";

export default class TaskHandler extends TaskHandlerBase
{

	constructor(private readonly _action:Closure)
	{
		super();
		if(!_action) throw new ArgumentNullException('action');
	}

	protected _onExecute():void
	{
		this._action();
	}

	protected _onDispose():void
	{
		super._onDispose();
		(<any>this)._action = null;
	}
}