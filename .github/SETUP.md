# Publishing to NPM

This document explains how to publish a new version to the NPM using GitHub Actions.

## Version Management

1. **Patch version** (bug fixes): `npm version patch`
2. **Minor version** (new features): `npm version minor`
3. **Major version** (breaking changes): `npm version major`

## Publishing

The GitHub Actions workflow automatically publishes to NPM when you create a GitHub release:

#### Publishing Steps:
1. **Update the version** in your local repository:
   ```bash
   # Update version in package.json
   npm version patch  # or minor, major
   git push origin master
   ```

2. **Create a GitHub Release**:

   **Option B: Using GitHub Web UI**
   - Go to your repository on GitHub
   - Click **"Releases"** → **"Create a new release"**
   - Set tag version (e.g., `v1.2.3`)
   - Add release title and notes
   - Click **"Publish release"**

	 **Option A: Using GitHub CLI**
	 ```bash
	 gh release create v1.2.3 --title "Release v1.2.3" --notes "Bug fixes and improvements"
	 ```