/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  base: '/', // this may need to change when i move into the gemp-lotr repo
  preview: {
    port: 8080,
    strictPort: true,
  },  
  resolve: {
    alias: [
      {
        find: '@gemp-assets',
        replacement: path.resolve(__dirname, './src/assets/'),
      },
    ],
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
    }
    // origin: "http://0.0.0.0:8080",
    // cors: false,
    // proxy: {
    //   '/gemp-lotr-server': {
    //     changeOrigin: true,
    //     target: 'http://localhost:17001/',
    //   },
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
