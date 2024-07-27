import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import vitePluginRequire from 'vite-plugin-require'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs(), vitePluginRequire.default()],
  build: {
    outDir: './dist'
  },
  optimizeDeps: {
    esbuildOptions: {
      // plugins: [esbuildCommonjs(['react-s3'])],
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        esbuildCommonjs(['react-s3']),
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})