export type GamePhase = 'SETUP' | 'PLAYING' | 'WON' | 'LOST'

export interface GameState {
  phase: GamePhase
  category: string
  secretWord: string
  normalizedWord: string[]
  guessedLetters: string[]
  correctLetters: string[]
  wrongLetters: string[]
  score: number
  attemptsRemaining: number
  message: string
}

export type GameAction =
  | { type: 'START_GAME'; payload: { category: string; word: string } }
  | { type: 'GUESS_LETTER'; payload: string }
  | { type: 'RESET_GAME' }

export interface Category {
  value: string
  label: string
}
