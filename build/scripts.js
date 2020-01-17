import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import paths from '../mconfig.json';

function scripts() {
    return rollup({
            input: paths.scripts.src + paths.scripts.main + '.js',
            plugins: [
                resolve(),
                babel({
                    exclude: 'node_modules/**'
                }),
                common({
                    include: 'node_modules/**'
                }),
            ]
        }).then(bundle => {
            return bundle.write({
                file: paths.scripts.dest + paths.scripts.main + '.js',
                name: paths.scripts.main,
                format: 'iife',
                sourcemap: true
            });
        });
}

export default scripts;
