const PkgxPantry = require('./index');

async function testSearchPackage() {
    const query = 'brewkit';
    const packages = await PkgxPantry.getPackages();
    const result = packages.filter(pkg => pkg.project.includes(query) || pkg.name.includes(query));
    if (result.length > 0) {
        console.log('Search result:', result);
        console.log('Test passed.');
    } else {
        console.error('Test failed: No packages found matching the query:', query);
    }
}

async function testGetVersionsForProject() {
    const versions = await PkgxPantry.getVersions('pkgx_sh_brewkit');
    if (versions.length > 0) {
        console.log('Versions:', versions);
        console.log('Test passed.');
    } else {
        console.error('Test failed: No versions found.');
    }
}

// Run the tests
Promise.all([testSearchPackage(), testGetVersionsForProject()])
    .catch(error => {
        console.error('Error:', error);
        process.exit(1); // Exit with non-zero code to indicate failure
    });
