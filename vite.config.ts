import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_API_URL } = loadEnv(mode, './');
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@material-ui/icons': '@material-ui/icons/esm',
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
