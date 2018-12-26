/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import UriComponent from "./UriComponent";
import {StringKeyValuePair} from "typescript-dotnet-core/KeyValuePair";
import {FiniteIEnumerable} from "typescript-dotnet-core/Collections/Enumeration/IEnumerable";
import FiniteEnumerableOrArrayLike from "typescript-dotnet-core/Collections/FiniteEnumerableOrArrayLike";

declare namespace QueryParam
{
	export type Array
		= ArrayLike<StringKeyValuePair<UriComponent.Value|UriComponent.Value[]>>;

	export type Enumerable
		= FiniteIEnumerable<StringKeyValuePair<UriComponent.Value|UriComponent.Value[]>>;

	export type EnumerableOrArray
		= FiniteEnumerableOrArrayLike<StringKeyValuePair<UriComponent.Value|UriComponent.Value[]>>;

	export type Convertible
		= string | UriComponent.Map | EnumerableOrArray;
}

export default QueryParam;
