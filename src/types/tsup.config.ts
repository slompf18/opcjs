import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/catalog.ts', 'src/primitives.ts', 'src/nodeid.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
