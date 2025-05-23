import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@entities': path.resolve(__dirname, 'src/Entities'),
      '@features': path.resolve(__dirname, 'src/Features'),
      '@widgets': path.resolve(__dirname, 'src/Widgets'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
      '@shared': path.resolve(__dirname, 'src/shared'), // если появится
    },
  },
});