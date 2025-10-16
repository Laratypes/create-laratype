import * as fs from 'fs';

export const isObject = (item: any) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export const mergePackageJson = (targetDir: string, sourceDir: string) => {
  const targetPackageJsonPath = `${targetDir}/package.json`;
  const sourcePackageJsonPath = `${sourceDir}/package.json`;

  if (!fs.existsSync(targetPackageJsonPath)) {
    console.error(`package.json not found at ${targetPackageJsonPath}`);
    return;
  }

  if (!fs.existsSync(sourcePackageJsonPath)) {
    console.error(`package.json not found at ${sourcePackageJsonPath}`);
    return;
  }

  const targetPackageJson = JSON.parse(fs.readFileSync(targetPackageJsonPath, 'utf-8'));
  const sourcePackageJson = JSON.parse(fs.readFileSync(sourcePackageJsonPath, 'utf-8'));

  const mergedPackageJson = mergeDeep(targetPackageJson, sourcePackageJson);

  return mergedPackageJson
}

export const overwriteLatestPackageVersions = (packageJsonPath: string, packageJson: any) => {
  const rootPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const currentVersion = rootPackageJson.version;
  const replace = (deps: any) => {
    for (const dep in deps) {
      if (deps[dep] === "latest-version") {
        deps[dep] = `^${currentVersion}`;
      }
    }
  }
  if (packageJson.dependencies) {
    replace(packageJson.dependencies);
  }

  if (packageJson.devDependencies) {
    replace(packageJson.devDependencies);
  }

  if (packageJson.peerDependencies) {
    replace(packageJson.peerDependencies);
  }

  return packageJson;
}