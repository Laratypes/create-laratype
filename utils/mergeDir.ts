import * as fs from 'fs';

export const mergeDir = (targetDir: string, sourceDir: string) => {
  fs.cpSync(sourceDir, targetDir, { recursive: true, force: false })
}

export const createFolder = (dirPath: string, folderName: string) => {
  const path = `${dirPath}/${folderName}`
  fs.mkdirSync(path);
  return path
}