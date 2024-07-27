import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'es2022',
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  watch: false
});
