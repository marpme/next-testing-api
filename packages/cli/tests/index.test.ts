import { defaultVitestConfig } from '../src/vitestConfig'
import { expect, test } from 'vitest'

test('exports vitest default config', () => {
    expect(defaultVitestConfig()).toStrictEqual({
        test: {
            clearMocks: true,
            coverage: undefined,
            environment: 'happy-dom',
            globals: true,
            mockReset: true,
        },
    })
})

test('exports vitest default config with coverage', () => {
    expect(defaultVitestConfig({ coverage: true })).toStrictEqual({
        test: {
            clearMocks: true,
            coverage: {
                all: true,
                include: ['src/'],
                reporter: ['text', 'lcov'],
            },
            environment: 'happy-dom',
            globals: true,
            mockReset: true,
        },
    })
})
