You have a list of file descriptors that look like this

```JSON
[
  {
    "size": 100,
    "tags": [
      'A',
      'B',
      'C'
    ]
  },
  {
    "size": 150,
    "tags": [
      'A'
    ]
  },
  {
    "size": 200
  }
]

```

Expected output when asked to summarize

```JSON
{
  "total": 450,
  "n": 1,
  "tagsRanked": [
    'A'
  ] 
}

```
