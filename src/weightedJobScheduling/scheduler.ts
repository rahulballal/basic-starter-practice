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

export function getIdOfJob(
  jobs: Pick<Job, 'id' | 'profit' | 'end'>[],
  startTime: number,
): number {
  // using binary search to look for the index of the max endtime that <= target
  let left = 0
  let right = jobs.length
  let mid = 0

  while (left < right) {
    mid = Math.floor(left + (right - left) / 2)
    if (jobs[mid].end > startTime) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  // the left === right which is the minimum value that is larger than target
  // then we choose the previous one which should be max value that is <= target

  return left - 1
}

export function scheduler(
  startTimes: number[],
  endTimes: number[],
  profits: number[],
) {
  const jobListSortedByEndTimes = toJobList(startTimes, endTimes, profits).sort(
    sortByEndTimeAsc,
  )
  const jobs: Pick<Job, 'id' | 'profit' | 'end'>[] = [
    { profit: 0, id: 'X', end: 0 },
  ]

  let currProfit = 0
  for (const job of jobListSortedByEndTimes) {
    const index = getIdOfJob(jobs, job.start)
    currProfit = jobs[index].profit + job.profit
    const previousProfit = jobs[jobs.length - 1].profit
    if (currProfit > previousProfit) {
      jobs.push({
        profit: currProfit,
        id: jobs[index].id,
        end: jobs[index].end,
      })
    }
  }
  const last = jobs[jobs.length - 1]
  return { profit: last.profit, selectedJobs: jobs.map((j) => j.id) }
}
