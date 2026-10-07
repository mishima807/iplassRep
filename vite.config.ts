/*
 * Copyright 2025 DENTSU SOKEN INC. All Rights Reserved.
 */
import path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { transformLazyShow } from 'v-lazy-show'

// eslint-disable-next-line no-restricted-imports
import { contextPath, serverPort } from './src/main/vue/develop/devConf'

export default defineConfig({
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [transformLazyShow],
        },
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      [contextPath]: {
        target: 'http://localhost:' + serverPort,
        changeOrigin: true,
        headers: {
          Origin: 'http://localhost:' + serverPort,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src/main/vue'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    cssCodeSplit: false,
    minify: true,
    lib: {
      entry: './buildvue/build-entrypoint.js',
      name: 'Mdc',
      fileName: 'iplass-mdc',
    },
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
