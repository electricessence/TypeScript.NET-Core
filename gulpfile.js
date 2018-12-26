"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const merge = require("merge2");
const PACKAGES = "./packages/";
const RENDER_PACKAGES = "Render Packages";
const REMOVE_SOURCE_JAVASCRIPT = "Remove Source JavaScript";
function setupDist(dist) {
    const localPackage = PACKAGES + dist + "/";
    const distFolder = localPackage + "dist";
    console.log(distFolder);
    const cleanTask = distFolder + " [ Clean ]", tsTask = localPackage + " [ TS Compile ]", copyDefTask = distFolder + " [ Copy Definitions ]", packageFiles = distFolder + " [ Copy Package Files ]";
    const tsProject = ts.createProject(localPackage + 'tsconfig.json');
    // First things first...  Avoid artifacts.
    gulp_1.task(cleanTask, () => gulp_1.src(distFolder, { allowEmpty: true })
        .pipe(clean()));
    // Compile the project.
    gulp_1.task(tsTask, () => {
        // This is quite the pain.  When using gulp, you have to split up the streams and reintegrate.
        const tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        return merge(tsResult.dts, // Doesn't need sourcemaps nor minification.
        tsResult.js
            .pipe(uglify())
            .pipe(sourcemaps.write('.')))
            .pipe(gulp_1.dest(distFolder));
    });
    // Copy *.d.ts files since the TS Compiler won't do it for us.
    gulp_1.task(copyDefTask, () => gulp_1.src(localPackage + "source/**/*.d.ts")
        .pipe(gulp_1.dest(distFolder)));
    gulp_1.task(packageFiles, () => gulp_1.src([
        localPackage + "package.json",
        localPackage + "README*",
        "LICENSE*"
    ])
        .pipe(gulp_1.dest(distFolder)));
    return gulp_1.series(cleanTask, gulp_1.parallel(tsTask, copyDefTask, packageFiles));
}
const packages = ["Core", "Events"]; // readdirSync(PACKAGES);
gulp_1.task(RENDER_PACKAGES, gulp_1.parallel(packages.map(setupDist)));
gulp_1.task(REMOVE_SOURCE_JAVASCRIPT, () => gulp_1.src(PACKAGES + "*/source/**/*.js").pipe(clean()));
exports.default = gulp_1.parallel(RENDER_PACKAGES);
