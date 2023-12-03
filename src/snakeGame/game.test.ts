import { Game, type Directions } from './game.ts'
import { expect, test } from 'vitest'

test('if food is found score is incremented correctly', () => {
  const snako = Game(3, 3, [
    [1, 1],
    [0, 2],
  ])
  const moves: Directions[] = ['R','D','R','U']
  moves.forEach(direction => snako.moveSnake(direction))
  // snako.moveSnake('R') // goto [0,1]
  // snako.moveSnake('D') // goto [1,1]
  // snako.moveSnake('R') // goto [1,2]
  // snako.moveSnake('U') // goto [0,2]
  const { snakeSize, score, foodIndex } = snako.peek()
  console.log({ snakeSize, score, foodIndex })
  expect(snakeSize.length).toEqual(3)
  expect(score).toEqual(2)
  expect(foodIndex).toEqual(2)
})

test('game throws out of bounds exception if snake goes out of the board', () => {
  const sneako = Game(5,5, [[1,1]])
  expect(() => sneako.moveSnake('L')).toThrowError('OUT_OF_BOUNDS')
})



