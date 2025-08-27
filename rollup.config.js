/**
 * @description      : Rollup configuration for TreeunfeDFe
 * @author           : Marco Lima 
 * @group            : 
 * @created          :  
 * 
 * MODIFICATION LOG
 * - Version         : 0.2.9
 * - Date            : 19/12/2024
 * - Author          : Cassio Seffrin
 * - Modification    : Unified configuration with environment-based optimization
**/
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import path from 'path';

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: isDevelopment, // Sourcemaps only in development
        exports: 'named',
      },
      {
        file: 'dist/cjs/index.cjs',
        format: 'cjs',
        sourcemap: isDevelopment, // Sourcemaps only in development
        exports: 'named',
        interop: 'auto',
      },
    ],
    external: [
      // Node.js built-in modules
      'fs', 'path', 'https', 'url', 'crypto', 'stream', 'util', 'buffer', 'events',
      'os', 'querystring', 'zlib', 'http', 'https', 'tls', 'net', 'child_process',
      'cluster', 'dgram', 'dns', 'domain', 'punycode', 'readline', 'repl', 'string_decoder',
      'timers', 'tty', 'v8', 'vm', 'worker_threads',

      // Problematic dependencies
      'bwip-js', 'xsd-schema-validator', 'pdfkit', 'pem', 'libxmljs2',
      'winston', 'winston-transport', 'readable-stream',

      // Development files
      'src/testes.ts'
    ],
    plugins: [
      alias({
        entries: [
          { find: '@Adapters', replacement: path.resolve(__dirname, 'src/adapters') },
          { find: '@Modules', replacement: path.resolve(__dirname, 'src/modules') },
          { find: '@Interfaces', replacement: path.resolve(__dirname, 'src/core/interfaces') },
          { find: '@Interfaces/*', replacement: path.resolve(__dirname, 'src/core/interfaces/*') },
          { find: '@Types', replacement: path.resolve(__dirname, 'src/core/types') },
          { find: '@Types/*', replacement: path.resolve(__dirname, 'src/core/types/*') },
          { find: '@Core', replacement: path.resolve(__dirname, 'src/core') },
          { find: '@Core/*', replacement: path.resolve(__dirname, 'src/core/*') },
          { find: '@Utils/*', replacement: path.resolve(__dirname, 'src/core/utils/*') },
        ],
      }),
      json(),
      nodeResolve({
        preferBuiltins: true,
        resolveOnly: [
          // Resolve only our source files, externalize everything else
          /^@Adapters/,
          /^@Modules/,
          /^@Interfaces/,
          /^@Types/,
          /^@Core/,
          /^@Utils/
        ]
      }),
      commonjs({
        // Ignore circular dependencies warnings
        ignore: [
          'winston-transport',
          'readable-stream',
          'async'
        ],
        // Transform problematic modules
        transformMixedEsModules: true,
        // Ignore specific circular dependency warnings
        ignoreDynamicRequires: true
      }),
      typescript({
        tsconfig: "tsconfig.json",
        sourceMap: isDevelopment, // Sourcemaps only in development
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        preventAssignment: true,
      }),
      copy({
        targets: [
          { src: 'src/resources/*', dest: 'dist/resources' },
        ],
      }),
      // Terser only in production
      ...(isProduction ? [terser({
        compress: {
          drop_console: true, // Remove console logs in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2, // Multiple compression passes
        },
        keep_fnames: false, // Allow function name mangling for smaller size
        mangle: {
          toplevel: true, // Mangle top-level names
        },
        format: {
          comments: false,
        },
      })] : []),
    ],
    onwarn(warning, warn) {
      // Ignore circular dependency warnings
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        return;
      }
      // Ignore preferBuiltins warnings
      if (warning.code === 'PREFER_BUILTINS') {
        return;
      }
      // Ignore other non-critical warnings
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        return;
      }
      // Warn about critical issues
      warn(warning);
    },
  },
];
