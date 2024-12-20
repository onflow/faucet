import {defineConfig} from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    viewportWidth: 1440,
    viewportHeight: 764,
    defaultCommandTimeout: 3000,
    responseTimeout: 4000,
    retries: {runMode: 3},
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    projectId: "hcrbev",
  },
})
