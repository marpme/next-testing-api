import { defineConfig } from 'vitest/config'

export type VitestConfig = {
    coverage?: boolean
}

export const defaultVitestConfig = ({ coverage }: VitestConfig = {}) =>
    defineConfig({
        test: {
            globals: true,
            mockReset: true,
            clearMocks: true,

            environment: 'happy-dom',

            coverage: coverage
                ? {
                      all: true,
                      reporter: ['text', 'lcov'],
                      include: ['src/'],
                  }
                : undefined,
        },
    })
