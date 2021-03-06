﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 * Source: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */

import {Action, Closure} from "typescript-dotnet-core/FunctionTypes";
export default interface IObserver<T>
{
	// onNext is optional because an observer may only care about onCompleted.
	onNext?:Action<T>;
	onError?:Action<any>;
	onCompleted?:Closure;
}