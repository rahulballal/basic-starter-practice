import { test, expect } from 'vitest'

import { scheduler } from './scheduler.ts'

test('default case should work', () => {
  const starts = [1, 2, 3, 3]
  const ends = [3, 4, 5, 6]
  const profits = [50, 10, 40, 70]
  const expectedProfit = 120
  const actual = scheduler(starts, ends, profits)
  expect(expectedProfit).toEqual(actual)
})
