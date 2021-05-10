const RE = /^(-?(?:\d+)?\.?\d+) *(ms|s|m|h|d|w|y)?$/i

const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const w = d * 7
const y = d * 365.25

export function time(input: string): number {
  input = String(input)
  if (input.length > 100) {
    return -1
  }
  const match = RE.exec(input)
  if (!match) {
    return -1
  }
  const n = parseFloat(match[1])
  const type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'y':
      return n * y
    case 'w':
      return n * w
    case 'd':
      return n * d
    case 'h':
      return n * h
    case 'm':
      return n * m
    case 's':
      return n * s
    case 'ms':
      return n
    default:
      return -1
  }
}

export function getTimeFromNow(input: string): number {
  return new Date().getTime() + time(input)
}
