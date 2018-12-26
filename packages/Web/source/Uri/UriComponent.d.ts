/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import Primitive from "typescript-dotnet-core/Primitive";
import {ISerializable} from "typescript-dotnet-core/Serialization/ISerializable";
import IMap from "typescript-dotnet-core/IMap";

declare namespace UriComponent {
	export interface Formattable
	{
		toUriComponent():string;
	}

	export type Value
		= Primitive|ISerializable|Formattable;

	export interface Map extends IMap<Value|Value[]>
	{

	}
}

export default UriComponent;


