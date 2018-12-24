"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function copyFileSync(source, target) {
    var targetFile = target;
    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function copyFolderRecursiveSync(source, target, fileFilter, rebase) {
    if (rebase === void 0) { rebase = false; }
    //check if folder needs to be created or integrated
    var targetFolder = rebase ? path.join(target, path.basename(source)) : target;
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    //copy
    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder, fileFilter, true);
            }
            else {
                if (!fileFilter || fileFilter.test(curSource))
                    copyFileSync(curSource, targetFolder);
            }
        });
    }
}
exports["default"] = copyFolderRecursiveSync;
//# sourceMappingURL=copyFolderRecursiveSync.js.map