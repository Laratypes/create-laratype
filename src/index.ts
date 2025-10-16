#!/usr/bin/env node

import * as fs from 'fs';
import { bold, green, red } from 'kolorist';
import { resolve } from "path";
import prompts from 'prompts';
import { mergePackageJson, overwriteLatestPackageVersions } from './utils/deepMergeObject';
import { createFolder, mergeDir } from './utils/mergeDir';

let defaultProjectName = 'laratype-test' // Change this to your desired project name

let targetDir = defaultProjectName;
const baseDir = resolve(__dirname, '../templates/typescript')
const buildPath = (dir: string) => resolve(baseDir, dir);

const steps = {
  packageName: {
    action(packageName: string) {
      if (fs.existsSync(process.cwd() + "/" + packageName)) {
        console.log(`${bold(red(packageName))} directory already exists.`)
        return
      }
      targetDir = createFolder(process.cwd(), packageName);
      mergeDir(targetDir, buildPath('base'));
      return true
    }
  },
  useORM: {
    dir: 'orm',
    action(choose: boolean) {
      if (choose) {
        const ormDir = buildPath(this.dir);
        mergeDir(targetDir, ormDir);
        const packageJsonMerged = mergePackageJson(targetDir, ormDir);
        packageJsonMerged.name = defaultProjectName
        fs.writeFileSync(targetDir + "/package.json", JSON.stringify(packageJsonMerged, null, 4));
      }
      return true;
    }
  }
}

const questions: prompts.PromptObject<keyof typeof steps>[] = [
  {
    name: 'packageName',
    type: 'text',
    message: 'Enter the name of your package:',
    initial: defaultProjectName,
    onState: (state) => {
      const name = String(state.value).trim();
      if (name) {
        defaultProjectName = name;
      }
      return defaultProjectName
    }
  },
  {
    name: 'useORM',
    type: 'confirm',
    message: 'Do you want to use ORM?',
    initial: true,
  }
]

const init = async () => {
  const result = await prompts(questions);
  let key: keyof typeof result;
  let stepResult: boolean | undefined = false;
  for (key in result) {
    const val = result[key] as never;
    stepResult = steps[key].action(val);
    if (!stepResult) break;
  }
  const packageJsonPath = targetDir + "/package.json";
  const rootPackageJsonPath = resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  fs.writeFileSync(packageJsonPath, JSON.stringify(overwriteLatestPackageVersions(rootPackageJsonPath, packageJson), null, 2));
  if (stepResult) {
    console.log(`Your project ${green(defaultProjectName)} has been initialized.`);
    console.log(green(`cd ${defaultProjectName}`));
    console.log(green(`npm install`));
    return true;
  }
  console.log(`${bold(red('ERROR:'))}`);
  console.log(red("Initialization failed. Please check your input and try again."));
}

init()