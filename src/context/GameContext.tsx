import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { GameState, GameAction } from '../types/game.types'
import { normalizeWord } from '../utils/persian'
import { MAX_ATTEMPTS, INITIAL_SCORE, CORRECT_BONUS, WRONG_PENALTY } from '../utils/constants'

const initialState: GameState = {
  phase: 'SETUP',
  category: '',
  secretWord: '',
  normalizedWord: [],
  guessedLetters: [],
  correctLetters: [],
  wrongLetters: [],
  score: INITIAL_SCORE,
  attemptsRemaining: MAX_ATTEMPTS,
  message: '',
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const normalized = normalizeWord(action.payload.word)
      return {
        ...initialState,
        phase: 'PLAYING',
        category: action.payload.category,
        secretWord: action.payload.word,
        normalizedWord: normalized,
        score: INITIAL_SCORE,
        attemptsRemaining: MAX_ATTEMPTS,
        message: 'شروع به حدس زدن کن...',
      }
    }

    case 'GUESS_LETTER': {
      const letter = action.payload

      if (state.guessedLetters.includes(letter)) {
        return { ...state, message: 'این حرف را قبلا حدس زده‌ای!' }
      }

      const isCorrect = state.normalizedWord.includes(letter)
      const newGuessed = [...state.guessedLetters, letter]

      if (isCorrect) {
        const newCorrect = [...state.correctLetters, letter]
        const allFound = state.normalizedWord.every((l) => newCorrect.includes(l))

        return {
          ...state,
          guessedLetters: newGuessed,
          correctLetters: newCorrect,
          phase: allFound ? 'WON' : 'PLAYING',
          message: allFound ? 'تبریک! برنده شدی!' : 'آفرین! درست بود',
          score: state.score + CORRECT_BONUS,
        }
      } else {
        const newWrong = [...state.wrongLetters, letter]
        const newAttempts = state.attemptsRemaining - 1

        return {
          ...state,
          guessedLetters: newGuessed,
          wrongLetters: newWrong,
          attemptsRemaining: newAttempts,
          phase: newAttempts === 0 ? 'LOST' : 'PLAYING',
          message: newAttempts === 0 ? 'متاسفانه باختی!' : 'اشتباه بود!',
          score: Math.max(0, state.score - WRONG_PENALTY),
        }
      }
    }

    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
