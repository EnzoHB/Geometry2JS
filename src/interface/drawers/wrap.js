import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

var code = '';

const root = './src/interface/drawers/functions';
const dir = 'functions'
const output = 'wrapped.js';

const info = readdirSync(root).map(file => {

    const name = file.replace(/\.\w+/, '')
    const from  = './' + path.join(dir, file).replaceAll('\\', '/');
    
    return { name, from };
});

info.forEach(({ name, from }) => 

code += `import ${name} from '${from}';\n`);
code += `export { ${info.map(({ name }) => name).join(', ')} };\n`;

writeFileSync(path.join(path.dirname(root), output), code);