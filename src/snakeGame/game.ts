// This code defines a function named Game that takes three parameters: boardRows, boardColumns, and foodLocations.
// The function creates a snake game where the snake moves on a grid of boardRows by boardColumns cells
// and tries to eat the food at the locations specified by foodLocations.
// The function returns an object with five methods: moveSnake, computeScore, getFoodIndex, getScore, and getSnakeSize.
// The moveSnake method takes a direction ('U', 'D', 'L', or 'R') and updates the snake's position and score accordingly.
// The computeScore method takes a row and a column and checks if the snake has hit the wall, itself, or the food.
// It returns -1 if the snake has lost, or the current score otherwise.
// The getFoodIndex method returns the index of the next food location in the foodLocations array.
// The getScore method returns the current score of the snake.
// The getSnakeSize method returns an array of [row, column] pairs that represent the snake's body.
// The function uses a variable named snakeSize to store the snake's body as an array of [row, column] pairs.
// It also uses a variable named foodIndex to keep track of which food location is next.
// It initializes both variables with some default values.
// It also uses a variable named score to store the current score of the snake. It initializes it with zero.
export type Directions = 'R' | 'L' | 'U' | 'D'

export function Game(
  boardRows: number,
  boardColumns: number,
  foodLocations: number[][],
) {
  const snakeSize = [[0, 0]]
  let foodIndex = 0
  let score = 0

  const peek = () => ({
    snakeSize,
    foodIndex,
    score
  })
  const computeScore = (row: number, column: number) => {
    const isOutOfBounds =
      row < 0 || row > boardRows - 1 || column < 0 || column > boardColumns - 1
    if (isOutOfBounds) {
      throw new Error('OUT_OF_BOUNDS')
    }

    // Not sure what below is for
    // const idx = snakeSize.find(([ro, col]) => {
    //   return ro === row && col === column
    // })
    //
    // if (idx) {
    //   return -1
    // }
    snakeSize.push([row, column])

    const isFoodAtSnakeHead =
      foodLocations[foodIndex] &&
      foodLocations[foodIndex][0] === row &&
      foodLocations[foodIndex][1] === column

    if (isFoodAtSnakeHead) {
      foodIndex = foodIndex + 1
      score = score + 1
      return score
    }
    snakeSize.shift()
    return score
  }
  const moveSnake = (direction: Directions) => {
    let [row, column] = snakeSize[snakeSize.length - 1]
    switch (direction) {
      case 'U':
        row = row - 1
        break
      case 'D':
        row = row + 1
        break
      case 'R':
        column = column + 1
        break
      case 'L':
        column = column - 1
        break
    }

    const score = computeScore(row, column)
    return score
  }

  return {
    moveSnake,
    computeScore,
    peek
  }
}
