import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'

export function LetterBoxes() {
  const { state } = useGame()

  return (
    <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
      {state.normalizedWord.map((letter, i) => {
        const revealed = state.correctLetters.includes(letter)

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold transition-colors duration-300 ${
              revealed
                ? 'bg-gradient-correct text-white shadow-lg shadow-emerald-500/20'
                : 'bg-white/10 border border-white/15'
            }`}
          >
            {revealed && (
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {letter}
              </motion.span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
