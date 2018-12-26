/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import {Func} from "typescript-dotnet-core/FunctionTypes";

export type IEventListener = EventListenerOrEventListenerObject | Func<void>;

export default IEventListener;