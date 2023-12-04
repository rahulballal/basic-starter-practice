import { test, expect } from 'vitest'
import { summarizeFiles, type FileInfo, type Summary } from './processor.ts'

test.each([
  [
    JSON.stringify([
      { size: 100, tags: ['A', 'B'] },
      { size: 100, tags: ['B'] },
      { size: 100 },
    ]),
    JSON.stringify({ total: 300, tagsRanked: ['B', 'A'] }),
  ],
])('given file data %s \n then should be %s', (files, expected) => {
  const input = JSON.parse(files) as FileInfo[]
  const exp = JSON.parse(expected) as Summary
  const actual = summarizeFiles(5, input)
  expect(actual.total).toEqual(exp.total)
  expect(actual.tagsRanked).toEqual(exp.tagsRanked)
})
