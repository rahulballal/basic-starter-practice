import { binarySearchLoopy, getMidPoint, binarySearchRecursive } from './binary.ts'
import { describe, it, expect } from 'vitest'

describe('getMidPoint', () => {
  it.each([[0, 0, 0], [0,5,2],[0,4,2],[2,9,5]])(
    `When low is %d and high is %d then mid is %d`,
    (low, high, mid) => {
      const actual = getMidPoint(low, high)
      expect(actual).toEqual(mid)
    },
  )
})

describe('binarySearchLoopy', () => {
  it('should throw if the array is empty', () => {
    expect(() => binarySearchLoopy([], 12)).toThrow()
  });
  it('should throw if the item is not found', () => {
    expect(() => binarySearchLoopy([1], 12)).toThrow()
  });
  it('should find the element if the item is present in the array', () => {
    const sortedArray = [1,4,12,45,56,100]
    const toFind = 56
    const expected = 4
    const actual = binarySearchLoopy(sortedArray, toFind)
    expect(actual).toEqual(expected)
  })
})

describe('binarySearchRecursive', () => {
  it('should throw if the array is empty', () => {
    expect(() => binarySearchRecursive([], 12)).toThrow()
  });
  it('should throw if the item is not found', () => {
    expect(() => binarySearchRecursive([1], 12)).toThrow()
  });
  it('should find the element if the item is present in the array', () => {
    const sortedArray = [1,4,12,45,56,100]
    const toFind = 56
    const expected = 4
    const actual = binarySearchRecursive(sortedArray, toFind)
    expect(actual).toEqual(expected)
  })
})
