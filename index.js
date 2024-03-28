const axios = require('axios');

class PkgxPantry {
  constructor() {
    this.PANTRY_URL = 'https://pkgx.dev/pkgs/index.json';
    this.VERSIONS_URL = 'https://dist.pkgx.dev/php.net/versions.txt';
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
      return pkg.project.includes(query) || pkg.name.includes(query);
    });
  }

  async getVersions(project) {
    try {
      const response = await axios.get(this.VERSIONS_URL);
      const versions = response.data.split('\n');
      return versions.filter(version => version.includes(project));
    } catch (error) {
      console.error('Failed to fetch versions:', error);
      return [];
    }
  }
}

module.exports = new PkgxPantry();
