import {createPinia} from 'pinia';
import type { App } from 'vue'



export const install = (app: App) => {
  app.use(createPinia());
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
};
