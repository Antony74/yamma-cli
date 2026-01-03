import fsp from 'fs/promises';
import path from 'path';

import mustache from 'mustache';

const templateFilename = path.join(__dirname, 'template.MD');
const readmeFilename = path.join(__dirname, '..', 'README.md');

const data = {
    curlDemo0: `curl -L https://github.com/metamath/set.mm/raw/refs/heads/develop/demo0.mm -O`,
    curlSetMm: `curl -L https://github.com/metamath/set.mm/raw/refs/heads/develop/set.mm -O`,
};

const main = async () => {
    const template = await fsp.readFile(templateFilename, {encoding: 'utf-8'});
    const readme = mustache.render(template, data);
    await fsp.writeFile(readmeFilename, readme);
};

main();
