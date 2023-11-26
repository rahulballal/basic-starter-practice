import { divide } from './utils.ts'
import { describe, it } from 'vitest'

describe('Divide', () => {
  it('should return both valid remainder and quotient values', (t) => {
    const { quotient, remainder } = divide(11, 2)
    t.expect(quotient).toEqual(5)
    t.expect(remainder).toEqual(1)
  })

  it('should throw when division by 0 error occurs', (t) => {
    t.expect(() => divide(5, 0)).toThrow()
  })
})
