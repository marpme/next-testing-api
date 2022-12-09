import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    clearMocks: true,

    coverage: {
      all: true,
      reporter: ['text', 'lcov'],
      include: ['src/'],
    },
  },
})
