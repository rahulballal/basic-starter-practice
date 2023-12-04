export type Job = {
  id: string
  start: number
  end: number
  profit: number
}

export function toJobList(
  startTimes: number[],
  endTimes: number[],
  profits: number[],
): Job[] {
  return startTimes.map((value, index) => {
    const job: Job = {
      start: value,
      end: endTimes[index],
      profit: profits[index],
      id: `J${index}`,
    }
    return job
  })
}

export function sortByEndTimeAsc(jobA: Job, jobB: Job): number {
  if (jobA.end < jobB.end) return -1
  if (jobA.end > jobB.end) return 1
  return 0
}

export function findIndexOfJobEndingClosestToGiven(left:number, right:number, target: number, sortedJobs: Job[]): number {
  let result = -1
  while (left <= right) {
    const mid = Math.floor((left + right)/2)
    if (sortedJobs[mid].end > target) {
      right = mid - 1
    } else {
      left = mid +1
      result = mid
    }
  }
  return result
}

export function scheduler(
  startTimes: number[],
  endTimes: number[],
  profits: number[],
) {
  const jobListSortedByEndTimes = toJobList(startTimes, endTimes, profits).sort(
    sortByEndTimeAsc,
  )

  let jobProfit = 0
  const memo: number[] = []
  for (let index = 0; index < jobListSortedByEndTimes.length; index++) {
    const previousJobIndex = findIndexOfJobEndingClosestToGiven(0, index, jobListSortedByEndTimes[index].start, jobListSortedByEndTimes)
    memo[index] = Math.max(
        (memo[index - 1] || 0),
        jobListSortedByEndTimes[index].profit + (memo[previousJobIndex] || 0)
    )
    jobProfit = Math.max(jobProfit, memo[index])
  }

  return jobProfit
}
