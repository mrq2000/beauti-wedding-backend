import * as fs from 'fs';

fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((dirent) => {
    requireJsModule(dirent);
  });

function requireJsModule(directoryName: string) {
  fs.readdirSync(__dirname + `/${directoryName}`, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name)
    .forEach((file) => {
      if (file.endsWith('.js') && !file.startsWith('index')) {
        module.exports = require(`./${directoryName}/${file}`);
      }
    });
}
