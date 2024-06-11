import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      hmr: mode === 'development',
    },
  };
});
