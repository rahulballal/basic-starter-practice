export function rateLimiterTimeBoundOnly(
  timeFactorInMs: number = 10,
  resetFactorInMs: number = 50,
) {
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

export function rateLimiterReqPerSecond(maxRequestPerSecond: number = 10, resetDurationInMS: number = 1000) {
  const buckets = new Map<string, { count: number; expiry: number }>()

  const getFreshLimitingData = () => {
    const current = new Date()
    const expiry = new Date()
    expiry.setSeconds(current.getSeconds() + 1)
    return { expiry: expiry.getTime(), count: 1 }
  }
  const isAllowed = (customerId: string): boolean => {
    const limitingData = buckets.get(customerId)
    if (limitingData) {
      const { count, expiry } = limitingData
      const now = new Date().getTime()
      if (now > expiry) {
        if((now - expiry) > resetDurationInMS) {
          buckets.set(customerId, getFreshLimitingData())
          return true
        }
        if (count <= maxRequestPerSecond) {
          buckets.set(customerId, getFreshLimitingData())
          return true
        }
        return false
      } else {
        return count <= maxRequestPerSecond;

      }
    } else {
      buckets.set(customerId, getFreshLimitingData())
      return true
    }
  }

  return {
    getBucket: () => buckets,
    isAllowed
  }
}
