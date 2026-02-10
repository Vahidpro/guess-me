import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { toPersianDigits } from '../../utils/persian'
import { MAX_ATTEMPTS } from '../../utils/constants'

export function GameStats() {
  const { state } = useGame()
  const attemptsRatio = state.attemptsRemaining / MAX_ATTEMPTS

  return (
    <div className="flex justify-around text-sm sm:text-base">
      <div className="flex items-center gap-2">
        <span className="text-white/50">امتیاز:</span>
        <motion.span
          key={state.score}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="font-bold text-yellow-400"
        >
          {toPersianDigits(state.score)}
        </motion.span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white/50">شانس باقی‌مانده:</span>
        <motion.span
          key={state.attemptsRemaining}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className={`font-bold ${attemptsRatio > 0.5 ? 'text-emerald-400' : attemptsRatio > 0.2 ? 'text-yellow-400' : 'text-red-400'}`}
        >
          {toPersianDigits(state.attemptsRemaining)}
        </motion.span>
      </div>
    </div>
  )
}
