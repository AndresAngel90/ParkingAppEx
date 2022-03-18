// register vue composition api globally
import {createApp} from 'vue';

import App from './App.vue';

// your custom styles here
import './styles/main.css';

// eslint-disable-next-line new-cap
export const app = createApp(App);

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map((i) => i.install(app));


app.mount('#app');
