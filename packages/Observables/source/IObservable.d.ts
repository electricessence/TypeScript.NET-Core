﻿/*!
* @author electricessence / https://github.com/electricessence/
* Based upon .NET source.
* Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
* Source:
*   http://referencesource.microsoft.com/#mscorlib/system/IObservable.cs
*   https://msdn.microsoft.com/en-us/library/dd990377.aspx
*/


import ISubscribable from "./ISubscribable";
import IObserver from "./IObserver";

export default interface IObservable<T> extends ISubscribable<IObserver<T>>
{
}
