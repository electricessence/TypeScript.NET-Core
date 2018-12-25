/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

export interface IValidationResult
{
	isValid:boolean;
	message?:string;
	data:any;
}

export default IValidationResult;