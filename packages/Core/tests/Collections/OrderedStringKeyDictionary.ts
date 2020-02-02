import * as ICollectionTests from "./ICollection";
import OrderedStringKeyDictionary
	from "../../dist/Collections/Dictionaries/OrderedStringKeyDictionary";
import KeyValuePair from "../../dist/KeyValuePair";

ICollectionTests.Collection<KeyValuePair<string,number>>(
	'OrderedStringKeyDictionary<'+'number>',
	new OrderedStringKeyDictionary<number>(),
	[
		{key: 'A', value: 1},
		{key: 'B', value: 2},
		{key: 'C', value: 3},
		{key: 'D', value: 4},
		{key: 'E', value: 5},
		{key: 'F', value: 6}
	]);
