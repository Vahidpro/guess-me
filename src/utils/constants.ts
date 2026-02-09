import type { Category } from '../types/game.types'

export const CATEGORIES: Category[] = [
  { value: 'city', label: 'نام شهر' },
  { value: 'actor-iran', label: 'بازیگر ایرانی' },
  { value: 'actor-foreign', label: 'بازیگر خارجی' },
  { value: 'country', label: 'کشور' },
  { value: 'animal', label: 'حیوان' },
  { value: 'things', label: 'اشیاء' },
  { value: 'fruit', label: 'میوه' },
  { value: 'random', label: 'همینجوری الکی' },
  { value: 'movie-foreign', label: 'فیلم خارجی' },
  { value: 'movie-iran', label: 'فیلم ایرانی' },
]

export const MAX_ATTEMPTS = 6
export const INITIAL_SCORE = 100
export const CORRECT_BONUS = 10
export const WRONG_PENALTY = 15
