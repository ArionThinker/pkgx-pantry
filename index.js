const axios = require('axios');

class PkgxPantry {
  constructor() {
    this.PANTRY_URL = 'https://app.pkgx.dev/v1/packages';
    this.VERSIONS_URL = 'https://app.pkgx.dev/v1/packages/{{slug}}';
  }

  async getPackages() {
    try {
      const response = await axios.get(this.PANTRY_URL);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      return [];
    }
  }

  async searchPackages(query) {
    const packages = await this.getPackages();
    return packages.filter(pkg => {
      return pkg.slug.includes(query) || pkg.name.includes(query) || pkg.full_name.includes(query);
    });
  }

  async getVersions(slug, platform = 'darwin', arch = 'x86-64') {
    try {
        const url = this.VERSIONS_URL.replace('{{slug}}', slug);
        const response = await axios.get(url);
        const versions = response.data.bottles.filter(bottle => bottle.platform === platform && bottle.arch === arch);

        return versions.map(version => version.version);
    } catch (error) {
        console.error('Failed to fetch versions:', error);
        return [];
    }
}

}

module.exports = new PkgxPantry();
