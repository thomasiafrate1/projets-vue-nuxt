import { defineConfig, devices } from '@playwright/test'
import process from 'node:process'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:3001/shop/' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx nuxi dev -p 3001',
    url: 'http://localhost:3001/shop/',
    reuseExistingServer: !process.env.CI
  }
})
