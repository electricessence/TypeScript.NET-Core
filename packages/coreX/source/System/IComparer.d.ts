/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

export interface IComparer<T>
{
	compare(a:T, b:T):number;
}

export default IComparer;
