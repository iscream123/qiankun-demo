import { defineConfig } from 'umi';

const packageName = require('./package.json').name;

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/detail/:id', component: 'detail/$id' },
  ],
  npmClient: 'pnpm',
  // chainWebpack(memo, { env, webpack }) {
  //   memo.output.library(`${packageName}-[name]`);
  //   memo.output.libraryTarget('umd');
  //   memo.output.chunkLoadingGlobal(`webpackJsonp_${packageName}`);
  // },
  // base: '/app-1',
  // base: window.__POWERED_BY_QIANKUN__  ? `/${packageName}` : '/'
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    slave: {},
  },
});
