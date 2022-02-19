import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_API_URL } = loadEnv(mode, './');
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: { '@material-ui/icons': '@material-ui/icons/esm' },
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
