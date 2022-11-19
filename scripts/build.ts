import * as child_process from 'child_process';
import {resolve} from 'path';

const packages = [
    'core',
    'vue'
];

const packagesPath = resolve(__dirname, '../packages');

const spawn = child_process.spawnSync;

for (const pkg of packages){

    console.log(`Building package '${pkg}'...`);

    const result = spawn('pnpm', ['build'], {
        cwd: resolve(packagesPath, pkg)
    });

    if(result.status === 0){
        console.log(`Successfully built package '${pkg}'.`);
    } else {
        console.log(`Error building package '${pkg}'.`);
        process.exit(1);
    }


}
