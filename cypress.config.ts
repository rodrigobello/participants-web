import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    specPattern: "src/tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
