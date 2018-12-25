/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

const copyFolderRecursiveSync = require("../../utility/copyFolderRecursiveSync").default;

copyFolderRecursiveSync("./source","./dist", /.+\.d\.ts$/i);