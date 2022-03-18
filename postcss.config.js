/* eslint-disable @typescript-eslint/no-var-requires */
const postcssCSSO = require('postcss-csso');
const postcssDedup = require('postcss-discard-duplicates');
const postcssPresetEnv = require('postcss-preset-env');
const postcssUrl = require('postcss-url');

module.exports = {
  plugins: [
    postcssUrl([
      {
        filter: t => {return /([a-zA-Z0-9\s_\\.\-():])+(.woff2)$/i.test(t.url);}, 
        url:(asset)=>asset.absolutePath
      }
    ]),
    postcssPresetEnv({stage: 1, autoprefixer: true}),
    postcssCSSO(),
    postcssDedup()
  ],
};
