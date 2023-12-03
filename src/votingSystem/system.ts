export function calculatePartyRanking(votes: string[]) {
  if (votes.length === 0) {
    return []
  }
  const [firstVote] = votes
  const parties = firstVote.split('')
  let partyTable: Map<string, number> = new Map()

  // create party table O(n * c)
  partyTable = votes.reduce((accum, vote) => {
    parties.forEach((party) => {
      const rank = vote.indexOf(party,0)
      const currentRankSum = accum.get(party) || 0
      const tempRank = currentRankSum + rank
      accum.set(party, tempRank)
    })
    return accum
  }, partyTable)

  // sort them O(log n)
  parties.sort((first, second) => {
    const firstRank = partyTable.get(first)!
    const secondRank = partyTable.get(second)!
    if (firstRank < secondRank) {
      return -1
    }
    if (firstRank > secondRank) {
      return 1
    }
    return first.localeCompare(second)
  })
  // O(n * c) + O(log n) = O(n)
  return parties
}
