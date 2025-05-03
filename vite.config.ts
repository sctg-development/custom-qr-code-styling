import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa'

import _package from './package.json' with { type: 'json' }

/**
 * Package.json type definition for React project
 *
 * Provides TypeScript typing for package.json structure with
 * common fields used in React applications
 */
export type PackageJson = {
  name: string
  private: boolean
  version: string
  type: string
  scripts: {
    dev: string
    build: string
    lint: string
    preview: string
    [key: string]: string
  }
  dependencies: {
    react: string
    'react-dom': string
    'react-bootstrap': string
    [key: string]: string
  }
  devDependencies: {
    typescript: string
    eslint: string
    vite: string
    [key: string]: string
  }
}

const packageJson: PackageJson = _package

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), githubPagesSpa()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'build', // To match CRA output folder
    // Inline assets smaller than 1KB
    // This is for demonstration purposes only
    // and should be adjusted based on the project requirements
    assetsInlineLimit: 1024,
    // Enable source maps for better debugging experience
    // This should be disabled in production for better performance and security
    sourcemap: true,
    rollupOptions: {
      output: {
        // Customizing the output file names
        assetFileNames: `assets/${packageJson.name}-[name]-[hash][extname]`,
        entryFileNames: `js/${packageJson.name}-[hash].js`,
        chunkFileNames: `js/${packageJson.name}-[hash].js`
      }
    }
  },
  server: {
    port: 3000, // To match default CRA port
    open: true
  }
})
