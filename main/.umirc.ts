import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/qiankun'],
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/app-1', component: 'app-1', isMicroApp: true, name: 'app-1' },
    { path: '/app-1/*', component: 'app-1', isMicroApp: true, name: 'app-1' },
    { path: '/app-2/*', component: 'app-2', isMicroApp: true, name: 'app-2' },
  ],
  npmClient: 'pnpm',
  qiankun: {
    master: {},
  },
});
