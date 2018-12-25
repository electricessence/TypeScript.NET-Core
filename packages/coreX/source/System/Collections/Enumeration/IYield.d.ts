/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */


export interface IYield<T>
{
	current:T|undefined;
	yieldReturn(value:T|undefined):boolean;
	yieldBreak():boolean;
}

export default IYield;
