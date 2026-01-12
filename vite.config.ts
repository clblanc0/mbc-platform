import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Allow access to process.env.API_KEY from either API_KEY or VITE_API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ''),
      // Safe polyfill for process.env
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        API_KEY: JSON.stringify(env.API_KEY || env.VITE_API_KEY || '')
      }
    }
  };
});