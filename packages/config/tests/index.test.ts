import { config } from '../src/index'
import { expect, test } from 'vitest'

test('exports config fucntion', () => {
    expect(config).instanceOf(Function)
})
