# Publishing Guide for @core-lib/demo-lib

This guide explains how to publish the demo library to npm and consume it in another Nx workspace.

## Prerequisites

1. npm account (create one at https://www.npmjs.com/)
2. npm CLI installed and logged in (`npm login`)

## Publishing the Library

### 1. Build the Library

```bash
cd packages/demo-lib
npx vite build
```

### 2. Test the Package Locally (Optional)

You can test the package locally before publishing:

```bash
# In the demo-lib directory
npm pack

# This creates a .tgz file that you can install in another project
# npm install /path/to/core-lib-demo-lib-0.0.1.tgz
```

### 3. Publish to npm

```bash
# Make sure you're in the packages/demo-lib directory
cd packages/demo-lib

# Publish to npm (first time)
npm publish --access public

# For subsequent versions, update version in package.json first
npm version patch  # or minor, major
npm publish
```

### 4. Verify Publication

Check that your package is available:

- Visit https://www.npmjs.com/package/@core-lib/demo-lib
- Or run: `npm view @core-lib/demo-lib`

## Consuming the Library in Another Nx Workspace

### 1. Install the Published Package

In your consumer workspace:

```bash
npm install @core-lib/demo-lib
```

### 2. Use the Library

Create a new application or library and use the demo functions:

```typescript
// src/main.ts or any TypeScript file
import { createGreeting, calculateSum, formatDate } from '@core-lib/demo-lib';

// Use the functions
const greeting = createGreeting('Developer');
console.log(greeting.message);

const sum = calculateSum([10, 20, 30]);
console.log(`Sum: ${sum.data.sum}`);

const dateInfo = formatDate();
console.log(dateInfo.message);
```

### 3. Example Consumer App

Here's a complete example of using the library in a new Nx app:

```bash
# In your consumer workspace
npx nx g @nx/node:app demo-consumer
```

Then update the generated app to use your library:

```typescript
// apps/demo-consumer/src/main.ts
import { createGreeting, calculateSum, formatDate } from '@core-lib/demo-lib';

console.log('=== Demo Library Consumer ===');

// Test greeting
const greeting = createGreeting('Nx Developer');
console.log('\n1. Greeting:');
console.log(greeting.message);
console.log('Data:', greeting.data);

// Test sum calculation
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum = calculateSum(numbers);
console.log('\n2. Sum Calculation:');
console.log(sum.message);
console.log('Result:', sum.data.sum);

// Test date formatting
const dateResult = formatDate();
console.log('\n3. Date Formatting:');
console.log(dateResult.message);
console.log('ISO:', dateResult.data.iso);

console.log('\n=== Demo Complete ===');
```

Run the consumer app:

```bash
npx nx serve demo-consumer
```

## Publishing to a Private Registry

If you want to publish to a private npm registry:

### 1. Configure npm registry

```bash
# Set registry for your scope
npm config set @core-lib:registry https://your-private-registry.com

# Or create .npmrc file in your project
echo "@core-lib:registry=https://your-private-registry.com" > .npmrc
```

### 2. Authenticate with private registry

```bash
npm login --registry=https://your-private-registry.com
```

### 3. Publish

```bash
npm publish --registry=https://your-private-registry.com
```

## Version Management

### Semantic Versioning

Follow semantic versioning (semver):

- **Patch** (0.0.X): Bug fixes
- **Minor** (0.X.0): New features (backward compatible)
- **Major** (X.0.0): Breaking changes

### Update Version

```bash
# Patch version (0.0.1 -> 0.0.2)
npm version patch

# Minor version (0.0.1 -> 0.1.0)
npm version minor

# Major version (0.0.1 -> 1.0.0)
npm version major
```

## Automation with CI/CD

You can automate publishing using GitHub Actions or other CI/CD tools:

```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: cd packages/demo-lib && npx vite build
      - run: cd packages/demo-lib && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting

### Common Issues

1. **Package name already exists**: Change the package name in `package.json`
2. **Authentication failed**: Run `npm login` and verify credentials
3. **Build errors**: Ensure all dependencies are installed and TypeScript compiles
4. **Missing files**: Check the `files` array in `package.json`

### Useful Commands

```bash
# Check what files will be published
npm pack --dry-run

# View package info
npm view @core-lib/demo-lib

# Check login status
npm whoami

# List published versions
npm view @core-lib/demo-lib versions --json
```
