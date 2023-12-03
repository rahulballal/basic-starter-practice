export function rateLimiter(timeFactorInMs: number = 10, resetFactorInMs:number = 50) {
  const limitMap = new Map<number, Date>()

  const peekMap = () => {
    return new Map(limitMap.entries())
  }

  const getFutureLimit = () => {
    const limit = new Date()
    limit.setMilliseconds(limit.getMilliseconds() + timeFactorInMs)
    return limit
  }

  const isAllowed = (customerId: number) => {
    if (limitMap.has(customerId)) {
      const currentTime = new Date().getTime()
      const limit = limitMap.get(customerId)!.getTime()
      const allow = limit > currentTime
      if (!allow && currentTime - limit >= resetFactorInMs) {
        limitMap.set(customerId, getFutureLimit())
        return true
      }
      return allow
    } else {
      limitMap.set(customerId, getFutureLimit())
      return true
    }
  }

  return {
    isAllowed,
    peekMap,
  }
}
