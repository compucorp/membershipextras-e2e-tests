import { PlaywrightTestConfig } from '@playwright/test';

const E2E_SERVER_URL = getServerUrl();
const E2E_SERVER_PORT = getPort();

const portString = E2E_SERVER_PORT !== '80' ? `:${E2E_SERVER_PORT}` : '';
const baseURL = `${E2E_SERVER_URL}${portString}`;

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config: PlaywrightTestConfig  = {
  testDir: './tests',
  outputDir: './report',
  reporter: 'list',
  timeout: 80000,
  use: {
    baseURL,
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Core_scenario',
    },
    {
      name: 'HCSA',
    },
  ],
};

export default config;

/**
 * Get the server url that we are running the tests on.
 */
 function getServerUrl(): string {
  return process.env.E2E_SERVER_URL || 'http://compuclient142sspv1.localhost';
}

/**
 * Get the port number.
 */
 function getPort(): string {
  return process.env.E2E_SERVER_PORT || '3951';
}
