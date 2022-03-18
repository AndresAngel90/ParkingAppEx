module.exports = {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-standard',
  ],
  plugins: ['stylelint-use-nesting'],
  rules: {
    'csstools/use-nesting': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'color-hex-case': 'upper',
  },
};
