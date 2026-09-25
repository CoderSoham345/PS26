import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Route HMR through the HTTPS preview proxy instead of the internal
      // Express port. This keeps Vite's client WebSocket on the public origin.
      hmr: {
        protocol: 'wss',
        clientPort: 443,
      },
      watch: {},
    },
  };
});
