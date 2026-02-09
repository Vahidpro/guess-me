import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { isPersian, toPersianDigits } from '../../utils/persian'
import { CATEGORIES } from '../../utils/constants'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'

export function SetupForm() {
  const { dispatch } = useGame()
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [word, setWord] = useState('')
  const [error, setError] = useState('')

  const letterCount = word.replace(/\s/g, '').length

  const handleStart = () => {
    const trimmed = word.trim()
    if (!trimmed) {
      setError('لطفا کلمه را وارد کنید')
      return
    }
    if (!isPersian(trimmed)) {
      setError('فقط حروف فارسی مجاز است')
      return
    }
    dispatch({ type: 'START_GAME', payload: { category, word: trimmed } })
  }

  return (
    <GlassCard className="w-full max-w-sm">
      <div className="flex flex-col gap-5 text-center">
        <h2 className="text-xl font-bold text-white/90">گروه کلمات</h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-white text-center text-base outline-none focus:border-accent-purple/60 transition-colors appearance-none cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value} className="bg-surface text-white">
              {c.label}
            </option>
          ))}
        </select>

        <div>
          <label className="block mb-2 text-lg text-white/80">کلمه:</label>
          <input
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value)
              setError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="کلمه مورد نظر شما..."
            className="w-full p-3 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-white text-center text-lg outline-none focus:border-accent-purple/60 placeholder:text-white/25 transition-colors"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-white/60">تعداد حروف:</span>
          <motion.span
            key={letterCount}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {toPersianDigits(letterCount)}
          </motion.span>
        </div>

        <Button onClick={handleStart} className="flex items-center justify-center gap-2 mx-auto">
          <span>حدس بزن!</span>
          <ArrowLeft size={20} />
        </Button>
      </div>
    </GlassCard>
  )
}
