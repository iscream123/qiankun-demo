// src/app.ts
export const qiankun = {
  apps: [
    {
      name: 'app-1',
      entry: '//localhost:8001',
    },
    {
      name: 'app-2',
      entry: '//localhost:8002',
    },
  ],
};


export function render(oldRender) {
  
  oldRender();
}
