// / <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            // include: ['/src/**/*'],
            reporter: ['text-summary'],
            src: ['/src/**/*']
        }
    }
});
