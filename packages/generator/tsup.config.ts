import { defineConfig } from 'tsup';

export default defineConfig([
  // Library entry – consumed by other packages
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
  },
  // CLI entry – bundled standalone executable
  {
    entry: { cli: 'src/cli.ts' },
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    noExternal: ['fast-xml-parser'],
  },
]);
