import { defineConfig } from 'vite';
import importMapPlugin from './build/plugins/importMapGenPlugin';

const nodeModulesEntry = [
  'vue',
  'naive-ui',
  '@element-plus/icons-vue',
  'echarts',
  '@antv/g6',
  '@antv/g6-v4',
].reduce((result, name) => {
  result[name] = `./node_modules/${name}`;
  return result;
}, {});

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
        ...nodeModulesEntry,
      },
      formats: ['es'],
    },
    outDir: 'lib',
  },
  plugins: [importMapPlugin()],
});
