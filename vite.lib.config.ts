import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  build: {
    copyPublicDir: false,
    lib: {
      name: 'lib',
      entry: {
        'vue-compiler-sfc': './node_modules/vue/compiler-sfc/index.browser.mjs',
        vue: './node_modules/vue/dist/vue.esm-browser.js',
        echarts: './node_modules/echarts/index.js',
        'antv-g6': './node_modules/@antv/g6/esm/index.js',
        'antv-g6-v4': './node_modules/@antv/g6-v4/es/index.js',
      },
      formats: ['es'],
    },
    outDir: 'lib',
  },
});
