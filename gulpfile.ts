/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {src, dest, parallel, series, task} from "gulp";
import * as clean from "gulp-clean";
import * as ts from "gulp-typescript";
import * as sourcemaps from "gulp-sourcemaps";
import * as uglify from "gulp-uglify";
import * as merge from "merge2";
import {readdirSync} from "fs";

const PACKAGES = "./packages/";
const RENDER_PACKAGES = "Render Packages";
const REMOVE_SOURCE_JAVASCRIPT = "Remove Source JavaScript";

function setupDist(dist:string)
{
	const localPackage = PACKAGES + dist + "/";
	const distFolder = localPackage + "dist";
	console.log(distFolder);

	const
		cleanTask    = distFolder + " [ Clean ]",
		tsTask       = localPackage + " [ TS Compile ]",
		copyDefTask  = distFolder + " [ Copy Definitions ]",
		packageFiles = distFolder + " [ Copy Package Files ]"

	const tsProject = ts.createProject(localPackage + 'tsconfig.json');

	// First things first...  Avoid artifacts.
	task(cleanTask,
		() => src(distFolder, {allowEmpty: true})
			.pipe(clean()));

	// Compile the project.
	task(tsTask,
		() => {
			// This is quite the pain.  When using gulp, you have to split up the streams and reintegrate.
			const tsResult = tsProject.src()
				.pipe(sourcemaps.init())
				.pipe(tsProject());

			return merge(
				tsResult.dts, // Doesn't need sourcemaps nor minification.
				tsResult.js
					.pipe(uglify({output: {comments: /^\/*!/}})) // uglify but keep special comments.
					.pipe(sourcemaps.write('.')))
				.pipe(dest(distFolder));
		});

	// Copy *.d.ts files since the TS Compiler won't do it for us.
	task(copyDefTask,
		() => src(localPackage + "source/**/*.d.ts")
			.pipe(dest(distFolder)));

	task(packageFiles,
		() => src([
			localPackage + "package.json",
			localPackage + "README*",
			"LICENSE*"
		])
			.pipe(dest(distFolder)));

	return series(cleanTask,
		parallel(
			tsTask,
			copyDefTask,
			packageFiles));
}

const packages = ["Core", "Events", "Observables"];// readdirSync(PACKAGES);
task(RENDER_PACKAGES,
	parallel(packages.map(setupDist)));

task(REMOVE_SOURCE_JAVASCRIPT,
	() => src(PACKAGES + "*/source/**/*.js").pipe(clean()));

export default parallel(
	RENDER_PACKAGES
);