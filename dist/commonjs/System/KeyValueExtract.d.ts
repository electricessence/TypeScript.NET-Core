/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import { KeyValuePair, KeyValuePairOrTuple } from "./KeyValuePair";
export declare function isKeyValuePair<TKey, TValue>(kvp: any): kvp is KeyValuePair<TKey, TValue>;
export declare function assertKey<TKey>(key: TKey, name?: string): TKey | never;
export declare function assertTuple(tuple: ArrayLike<any>, name?: string): void | never;
export declare function assertNotUndefined<T>(value: T, name: string): T | never;
export declare function extractKeyValue<TKey, TValue, TResult>(item: KeyValuePairOrTuple<TKey, TValue>, to: (key: TKey, value: TValue) => TResult): TResult;
export default extractKeyValue;
