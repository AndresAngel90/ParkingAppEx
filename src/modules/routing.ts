import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';



export const install = (app: App) => {
  app.use(createRouter({
    history: createWebHashHistory(),
    routes: setupLayouts(generatedRoutes),
  }));
};
