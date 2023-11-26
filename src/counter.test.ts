import { hello } from './counter'
import { test } from 'vitest'

test('example', (t) => {
  t.expect(hello()).toBe('Hello World')
})
