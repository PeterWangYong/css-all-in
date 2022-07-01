import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import globalStyle from '@originjs/vite-plugin-global-style';
import content from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), globalStyle(), content()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
