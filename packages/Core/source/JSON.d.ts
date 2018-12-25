/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
import Primitive from "./Primitive";
import IMap from "./IMap";

export type JsonEntry = Primitive | JsonArray | JsonMap;

export interface JsonArray extends ArrayLike<JsonEntry>
{

}

export interface JsonMap extends IMap<JsonEntry>
{

}

export type JsonData = JsonMap | JsonArray | Primitive;
