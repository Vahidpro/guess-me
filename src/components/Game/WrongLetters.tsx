import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'

export function WrongLetters() {
  const { state } = useGame()

  if (state.wrongLetters.length === 0) return null

  return (
    <div className="text-center">
      <p className="text-sm text-white/50 mb-2">حروف اشتباه:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <AnimatePresence>
          {state.wrongLetters.map((letter, i) => (
            <motion.div
              key={letter}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.05 }}
              className="w-10 h-10 rounded-lg bg-gradient-wrong flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-red-500/20"
            >
              {letter}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
