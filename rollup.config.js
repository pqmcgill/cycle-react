import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [{
    name: 'CycleReact',
    file: 'lib/cycle-react.js',
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'xstream': 'xs'
    },
  }],
  external: [
    'xstream',
    'react',
    'react-dom'
  ],
  plugins: [
    // resolve(),
    // commonjs(),
    typescript({
      declaration: true
    })
  ]
};
