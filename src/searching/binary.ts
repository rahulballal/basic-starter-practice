export function getMidPoint(low: number, high: number): number {
  return Math.floor(low + (high - low) / 2)
}

export function binarySearchLoopy<T>(sortedArray: Array<T>, toFind: T): number {
  // edge cases
  if (sortedArray.length === 0) {
    throw new Error(`${toFind} was not found in the array`)
  }
  if (sortedArray[0] === toFind) {
    return 0
  }
  // Main Case
  let low = 0
  let high = sortedArray.length - 1
  let midPoint = 0
  do {
    midPoint = getMidPoint(low, high)
    if (sortedArray[midPoint] === toFind) {
      return midPoint
    }
    if (sortedArray[midPoint] > toFind) {
      console.log('Going to left subtree')
      high = midPoint - 1
    } else {
      console.log('Going to the right subtree')
      low = midPoint + 1
    }
  } while (low < high)

  throw new Error(`${toFind} was not found in the array`)
}

export function binarySearchRecursive<T>(sortedArray: T[], toFind: T): number {
  const low = 0
  const high = sortedArray.length - 1
  // edge cases
  if (sortedArray.length === 0) {
    throw new Error(`${toFind} was not found in the array`)
  }
  if (sortedArray[0] === toFind) {
    return 0
  }

  function rec<T>(arr: T[], value: T, low: number, high: number): number {
    if (low < high) {
      const midPoint = getMidPoint(low, high)
      if (arr[midPoint] === value) {
        return midPoint
      }
      if (arr[midPoint] > value) {
        console.log('Going to left subtree')
        high = midPoint - 1
        return rec(arr, value, low, high)
      } else {
        console.log('Going to the right subtree')
        low = midPoint + 1
        return rec(arr, value, low, high)
      }
    }
    throw new Error(`${toFind} was not found in the array`)
  }

  const foundIndex = rec(sortedArray, toFind, low, high)
  return foundIndex
}
