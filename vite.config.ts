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
      // The preview proxy does not forward Vite's WebSocket endpoint. Disable
      // the client connection so it cannot repeatedly report closed sockets.
      hmr: false,
      watch: {},
    },
  };
});
