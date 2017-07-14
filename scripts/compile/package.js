const fs = require('fs');
const { targetPath, writeFileObs } = require('../util');
const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8').toString());

const whitelistedPackageKeys = [
    'name',
    'version',
    'description',
    'author',
    'homepage',
    'bugs',
    'license',
    'keywords',
    'peerDependencies',
    'typings',
]

module.exports = function generatePackageJSON(target, format) {
    const targetRoot = targetPath(target, format);
    const pkg = whitelistedPackageKeys.reduce((pkg, key) => {
        pkg[key] = packageJSON[key];
        return pkg;
    }, { main: `Ix.js` });
    pkg.name = `@reactivex/${pkg.name}/${target}/${format}`;
    return writeFileObs(`${targetRoot}/package.json`, JSON.stringify(pkg, null, 2));
}

