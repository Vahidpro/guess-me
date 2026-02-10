const PERSIAN_REGEX = /^[آا-ی\s]+$/

export function isPersian(text: string): boolean {
  return PERSIAN_REGEX.test(text)
}

export function normalizeWord(word: string): string[] {
  return word.replace(/\s/g, '').split('')
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(num: number): string {
  return String(num)
    .split('')
    .map((d) => PERSIAN_DIGITS[parseInt(d)] ?? d)
    .join('')
}
