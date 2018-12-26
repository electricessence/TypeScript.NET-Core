/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

export default interface ITimer
{
	isRunning:boolean;
	start():void;
	stop():void;
	reset():void;
}
