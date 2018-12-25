/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import IDisposable from "./IDisposable";

export default interface IDisposableAware extends IDisposable
{
	wasDisposed:boolean;
}