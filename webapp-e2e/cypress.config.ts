import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run webapp:serve',
        production: 'nx run webapp:preview',
      },
      ciWebServerCommand: 'nx run webapp:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
