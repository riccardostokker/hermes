import * as child_process from 'child_process';
import {FSWatcher, watch} from 'chokidar';
import {resolve} from 'path';

const packages = [
    'core',
    'vue'
];

const packagesPath = resolve(__dirname, '../packages');

const watchers: FSWatcher[] = [];
const last: Record<string, number> = {};

for (const pkg of packages){

    const watcher = watch([
        resolve(packagesPath, pkg, 'src/**/*'),
        resolve(packagesPath, pkg, 'node_modules/@hermes-renderer/**/dist/**/*')
    ]);

    watcher.on('change', async () => {
        const spawn = child_process.spawn;

        if(last[pkg] && Date.now() - last[pkg] < 500)
            return;

        last[pkg] = Date.now();

        console.log(`Rebuilding Package '${pkg}' ...`);

        spawn('pnpm', ['build'], {
            //stdio: ['pipe', 'inherit', 'pipe'],
            cwd: resolve(packagesPath, pkg)
        });

    });

    watchers.push(watcher);

}

console.log('Watcher initialized. Listening for changes...');

for(const signal of ['SIGINT', 'SIGTERM', 'SIGQUIT']){
    process.on(signal, async () => {
        for(const watcher of watchers)
            await watcher.close();
    });
}
