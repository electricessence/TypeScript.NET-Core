/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {src, dest, parallel, series, task} from "gulp";
import * as clean from "gulp-clean";
import {readdirSync} from "fs";

const PACKAGES = "./packages/";
const COPY_DEFINITIONS = "Copy Definitions";
const REMOVE_SOURCE_JAVASCRIPT = "Remove Source JavaScript";

function setupDist(dist:string)
{
	const distFolder = PACKAGES + dist + "/dist";
	console.log(distFolder);

	const cleanTask = distFolder + " [ Clean ]", copyDefTask = distFolder + " [ "+COPY_DEFINITIONS+" ]";
	task(cleanTask, () => src(distFolder, {allowEmpty:true}).pipe(clean()));
	task(copyDefTask, () => src(PACKAGES + dist + "/source/**/*.d.ts").pipe(dest(distFolder)));
	return series(cleanTask, copyDefTask);
}

const packages = readdirSync(PACKAGES);
task(COPY_DEFINITIONS,
	parallel(packages.map(setupDist)));

task(REMOVE_SOURCE_JAVASCRIPT,
	()=> src(PACKAGES+"*/source/**/*.js").pipe(clean()));

export default parallel(
	COPY_DEFINITIONS
);