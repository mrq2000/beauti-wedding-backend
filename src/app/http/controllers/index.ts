import * as fs from 'fs';

fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((dirent) => !dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((file) => {
    if (file.endsWith('.js') && !file.startsWith('index')) {
      module.exports = require(`./${file}`);
    }
  });
