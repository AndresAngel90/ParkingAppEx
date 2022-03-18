import { fromPairs } from 'ramda';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

const messages = fromPairs(
  Object.entries(import.meta.globEager('../../locales/*.json')).map(
    ([key, value]) => {
      return [key.slice(14, -5), value.default];
    }
  )
);

export const install = (app: App) => {
  app.use(
    createI18n({
      legacy: false,
      locale: 'en-us',
      messages,
    })
  );
};
