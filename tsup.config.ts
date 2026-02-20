import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    // TODO: Re-enable when parser is implemented
    // 'generator/cli': 'src/generator/cli.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.sourcesContent = true;
  },
});
