import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    define: {
        'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],

     // Workaround before renaming .js to .jsx
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  // End workaround

  };
});