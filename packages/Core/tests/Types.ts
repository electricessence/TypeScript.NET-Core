///<reference types="node"/>
import * as assert from "assert";
import "mocha";
import Type from "../dist/Types";

describe('.hasMember()', ()=>
{
	it('should detect a positive match for prototype functions', ()=>
	{
		class A extends Array {}
		assert.ok(Type.hasMember(new A(),'push'));
	});

	it('should detect a positive match', ()=>
	{
		assert.ok(Type.hasMember({
			a:'hello',
			b:undefined
		},'b'));
	});
});
