import { rateLimiterTimeBoundOnly } from './limitter.ts'
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'

describe('rateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should set the limiting data into the store when a customerId is encountered the first time and return true', () => {
    const { peekMap, isAllowed } = rateLimiterTimeBoundOnly()
    expect(peekMap().size === 0).toBe(true)
    expect(isAllowed(1982)).toBe(true)
    expect(peekMap().size > 0).toBe(true)
    expect(peekMap().get(1982)?.getMilliseconds()).toBeGreaterThanOrEqual(
      new Date().getMilliseconds(),
    )
  })

  it('should check the incoming customerId against the store to disallow access if limit has been reached', () => {
    const current = new Date()
    const future = new Date().setMilliseconds(current.getMilliseconds() + 12)
    const { isAllowed } = rateLimiterTimeBoundOnly()
    vi.setSystemTime(current)
    const original = isAllowed(1982)
    vi.setSystemTime(future)
    const next = isAllowed(1982)
    expect(original).toEqual(true)
    expect(next).toEqual(false)
  })

  it('End to end test', () => {
    const history: boolean[] = []
    const maxInterval = 30
    const callInterval = 2
    const {isAllowed} = rateLimiterTimeBoundOnly(5)
    const interval = setInterval(() => {
      history.push(isAllowed(1982))
    }, callInterval)

    setTimeout(() => clearInterval(interval), maxInterval)
    vi.advanceTimersByTime(maxInterval +1)
    console.log(history)
    expect(history.some(item => item === false)).toEqual(true)
  })
})


