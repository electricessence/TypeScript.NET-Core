/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {src, dest, parallel} from "gulp";

const distributions = [
	"Core"
];

const copyDefinitionTasks = distributions.map( d =>
	()=> src("./packages/" + d + "/source/**/*.d.ts")
			.pipe(dest("./packages/" + d + "/dist")));

export const copyDefinitions = parallel(copyDefinitionTasks);
