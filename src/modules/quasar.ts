import { Quasar, Dialog } from 'quasar'
import type { App } from 'vue'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'


export const install = (app: App) => {
  app.use(Quasar, {
    plugins:{Dialog}
  })
};
