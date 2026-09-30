const ksh = new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 })

export function price(amount: number): string {
  return `KSh ${ksh.format(amount)}`
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null
  return Math.round((1 - price / compareAt) * 100)
}

export function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function pad(n: number): string {
  return String(n).padStart(2, '0')
}
