export const divide = (numerator: number, denominator: number) => {
  const remainder = numerator % denominator
  const quotient = Math.floor(numerator / denominator)
  if (!Number.isFinite(quotient)) {
    throw new Error('DivideByZeroError')
  }
  return {
    remainder,
    quotient,
  }
}
