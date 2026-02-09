import { motion } from 'framer-motion'
import { Trophy, Frown, RotateCcw, Share2 } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { useShare } from '../../hooks/useShare'
import { toPersianDigits } from '../../utils/persian'
import { CATEGORIES } from '../../utils/constants'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function GameResult() {
  const { state, dispatch } = useGame()
  const share = useShare()
  const won = state.phase === 'WON'
  const open = state.phase === 'WON' || state.phase === 'LOST'
  const categoryLabel = CATEGORIES.find((c) => c.value === state.category)?.label ?? state.category

  return (
    <Modal open={open} onClose={() => dispatch({ type: 'RESET_GAME' })}>
      <div className="flex flex-col items-center gap-5 text-center pt-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
        >
          {won ? (
            <Trophy size={56} className="text-yellow-300" />
          ) : (
            <Frown size={56} className="text-red-300" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-white">
          {won ? 'تبریک! برنده شدی!' : 'متاسفانه باختی!'}
        </h2>

        {!won && (
          <p className="text-white/70">
            کلمه صحیح: <span className="font-bold text-white">{state.secretWord}</span>
          </p>
        )}

        <div className="flex items-center gap-2">
          <span className="text-white/70">امتیاز نهایی:</span>
          <span className="text-2xl font-bold text-yellow-300">
            {toPersianDigits(state.score)}
          </span>
        </div>

        <p className="text-white/50 text-sm">
          دسته‌بندی: {categoryLabel}
        </p>

        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <Button onClick={() => dispatch({ type: 'RESET_GAME' })} className="flex items-center gap-2">
            <RotateCcw size={18} />
            بازی دوباره
          </Button>
          <Button variant="ghost" onClick={() => share(state.score)} className="flex items-center gap-2">
            <Share2 size={18} />
            اشتراک
          </Button>
        </div>
      </div>
    </Modal>
  )
}
