/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  headless: false,
  testDir: 'integration/',
  use: {baseURL: 'http://127.0.0.1:3333'},
  projects: [
    {name: 'Chromium Landscape', use: {viewport: {width: 1152, height: 720}}},
  ],
};

module.exports = config;
