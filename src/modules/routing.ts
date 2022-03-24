import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import type { App } from 'vue'
import { createRouter, createWebHashHistory, Router } from 'vue-router';
import { authGuard } from '~/guards/AuthGuard';

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(generatedRoutes),
});

router.beforeEach(authGuard);

export const install = (app: App) => {
  app.use(router);
};
