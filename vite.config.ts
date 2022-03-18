/// <reference types="vitest" />
import {resolve} from 'path';

import VueI18n from '@intlify/vite-plugin-vue-i18n';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Legacy from '@vitejs/plugin-legacy';
import Vue from '@vitejs/plugin-vue';
import CleanUp from 'rollup-plugin-cleanup';
import Visualizer from 'rollup-plugin-visualizer';
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite';
import {defineConfig} from 'vite';
import Inspect from 'vite-plugin-inspect';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import SvgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
      template: { transformAssetUrls },
    }),
    Inspect(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      defaultLayout:'default-layout',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      dirs: ['src/components'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [
        QuasarResolver()
      ]
    }),

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    quasar({
      sassVariables: 'src/styles/quasar-variables.sass'
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),
    SvgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    CleanUp({
      extensions: ['js', 'mjs', 'vue'],
      comments: ['some', 'istanbul', /STABLE/, /__PURE__/],
    }),
    Legacy({
      ignoreBrowserslistConfig: false,
    }),
    Visualizer({
      filename: resolve(__dirname, 'dist/REPORT/stats.html'),
      template: 'treemap', // sunburst|treemap|network
      sourcemap: true,
      brotliSize: true,
      gzipSize: true,
    }),
  ],
  base: './',
  server: {
    fs: {
      strict: true,
    },
    force: true,
  },
  build: {
    brotliSize: true,
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        compact: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'ky',
      'ramda',
      'pinia',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [...(configDefaults?.exclude ?? []),'integration/*'],
    coverage: { 
      exclude:[...(configDefaults?.coverage?.exclude ?? []),'__mocks__','**/*.spec.*','**/*.test.*'],
    },
  },
});
