import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'build', // To match CRA output folder
  },
  server: {
    port: 3000, // To match default CRA port
    open: true
  }
});