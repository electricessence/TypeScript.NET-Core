"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const clean = require("gulp-clean");
const fs_1 = require("fs");
const PACKAGES = "./packages/";
const COPY_DEFINITIONS = "Copy Definitions";
const REMOVE_SOURCE_JAVASCRIPT = "Remove Source JavaScript";
function setupDist(dist) {
    const distFolder = PACKAGES + dist + "/dist";
    console.log(distFolder);
    const cleanTask = distFolder + " [ Clean ]", copyDefTask = distFolder + " [ " + COPY_DEFINITIONS + " ]";
    gulp_1.task(cleanTask, () => gulp_1.src(distFolder, { allowEmpty: true }).pipe(clean()));
    gulp_1.task(copyDefTask, () => gulp_1.src(PACKAGES + dist + "/source/**/*.d.ts").pipe(gulp_1.dest(distFolder)));
    return gulp_1.series(cleanTask, copyDefTask);
}
const packages = fs_1.readdirSync(PACKAGES);
gulp_1.task(COPY_DEFINITIONS, gulp_1.parallel(packages.map(setupDist)));
gulp_1.task(REMOVE_SOURCE_JAVASCRIPT, () => gulp_1.src(PACKAGES + "*/source/**/*.js").pipe(clean()));
exports.default = gulp_1.parallel(COPY_DEFINITIONS);
