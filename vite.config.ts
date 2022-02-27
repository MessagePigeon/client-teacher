import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@material-ui/icons': '@material-ui/icons/esm',
      '~': path.resolve(__dirname, './src'),
    },
  },
});
