import { defineConfig } from "cypress";
import config from "./app/config";

export default defineConfig({
  e2e: {
    baseUrl: config.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  env: {
    googleClientId: config.GOOGLE_CLIENT_ID,
    googleClientSecret: config.GOOGLE_CLIENT_SECRET,
  },
});
