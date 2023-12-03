import { test, expect } from 'vitest'
import { calculatePartyRanking } from './system.ts'

test('should return [] if the vote stream is empty', () => {
  const result = calculatePartyRanking([])
  expect(result.length).toEqual(0)
})

test.each([
  ['ABC,ACB,ABC,ACB,ACB', 'ACB'],
  ['WXYZ,XYZW', 'XWYZ'],
  ['ZMNAGUEDSJYLBOPHRQICWFXTVK', 'ZMNAGUEDSJYLBOPHRQICWFXTVK'],
  ['BCA,CAB,CBA,ABC,ACB,BAC', 'ABC'],
  ['M,M,M,M', 'M'],
])('when votes are %s then result is %s', (votes, result) => {
  const voteArray = votes.split(',')
  const actual = calculatePartyRanking(voteArray).join('')
  expect(result).toEqual(actual)
})
