import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7002',
      changeOrigin: true
    },
  }
});
