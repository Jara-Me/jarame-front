import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// vite.config.js
import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
  optimizeDeps: {
    exclude:['js-big-decimal']
  },
})

