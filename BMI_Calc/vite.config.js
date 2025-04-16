/// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // So you can use `describe`, `test`, `expect` without importing them
    setupFiles: './src/test/setup.js' // Optional setup file
  }
});
