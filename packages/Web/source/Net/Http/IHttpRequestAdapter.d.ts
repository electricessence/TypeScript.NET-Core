/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import {IHttpRequestParams} from "./IHttpRequestParams";
/**
 * Facilitates injecting a http request class for use with other classes.
 */
export default interface IHttpRequestAdapter
{
	request<TResult>(params:IHttpRequestParams):PromiseLike<TResult>;
}
