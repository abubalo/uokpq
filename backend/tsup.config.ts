import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'es2019',
  sourcemap: true,
  clean: true,
  dts: true,
  splitting: false,
  minify: false,
  watch: false
});
