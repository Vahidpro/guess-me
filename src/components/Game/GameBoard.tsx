import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { CATEGORIES } from '../../utils/constants'
import { GlassCard } from '../ui/GlassCard'
import { LetterBoxes } from './LetterBoxes'
import { WrongLetters } from './WrongLetters'
import { GuessInput } from './GuessInput'
import { GameStats } from './GameStats'
import { GameResult } from './GameResult'

export function GameBoard() {
  const { state, dispatch } = useGame()
  const categoryLabel = CATEGORIES.find((c) => c.value === state.category)?.label ?? ''

  return (
    <>
      <GlassCard className="w-full max-w-sm relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch({ type: 'RESET_GAME' })}
          className="absolute top-4 left-4 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowRight size={20} className="text-white/60" />
        </motion.button>

        <div className="flex flex-col gap-5 pt-6">
          <p className="text-center text-sm text-white/40">{categoryLabel}</p>

          <LetterBoxes />
          <WrongLetters />

          {state.message && state.phase === 'PLAYING' && (
            <motion.p
              key={state.message}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white/70 text-sm"
            >
              {state.message}
            </motion.p>
          )}

          <GuessInput />
          <GameStats />
        </div>
      </GlassCard>

      <GameResult />
    </>
  )
}
