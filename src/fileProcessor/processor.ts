export type FileInfo = {
  size: number; tags?: string[]
}

export type Summary = {
  tagsRanked?: string[]
  total: number
}
// O(n * c) + O(log c) = O(n)
export function summarizeFiles(
  topN: number = 5,
  filesInfo: FileInfo[],
): Summary {
  let total = 0
  const tagMap: { [key: string]: number} = {}
  const tagSorter = (tag1:string, tag2: string):number => {
    const tag1Value = tagMap[tag1] || 0
    const tag2Value = tagMap[tag2] || 0
    if (tag1Value < tag2Value) return 1
    if (tag1Value > tag2Value) return -1
    return 0
  }
  // O(N * c)
  filesInfo.forEach((fileInfo) => {
    total = total + fileInfo.size
    if (fileInfo.tags) {
      fileInfo.tags.forEach((tag) => {
        const tagCount = tagMap[tag]
        if (tagCount) {
          tagMap[tag] = tagCount + 1
        } else {
          tagMap[tag]= 1
        }
      })
    }
  })

  // O(log c)
  const allTags = Object.keys(tagMap)
  const tagsRanked = allTags.sort(tagSorter).slice(0,topN -1)

  return {
    total,
    tagsRanked
  }
}
