import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { isPersian } from '../../utils/persian'
import { useSound } from '../../hooks/useSound'
import { Button } from '../ui/Button'

export function GuessInput() {
  const { state, dispatch } = useGame()
  const [letter, setLetter] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { playCorrect, playWrong, playWin, playLose } = useSound()
  const prevPhase = useRef(state.phase)

  useEffect(() => {
    inputRef.current?.focus()
  }, [state.guessedLetters])

  useEffect(() => {
    if (prevPhase.current === 'PLAYING' && state.phase === 'WON') playWin()
    if (prevPhase.current === 'PLAYING' && state.phase === 'LOST') playLose()
    prevPhase.current = state.phase
  }, [state.phase, playWin, playLose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!letter || !isPersian(letter)) return

    const isCorrect = state.normalizedWord.includes(letter)
    dispatch({ type: 'GUESS_LETTER', payload: letter })

    if (isCorrect) {
      playCorrect()
    } else {
      playWrong()
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }

    setLetter('')
  }

  if (state.phase !== 'PLAYING') return null

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 justify-center">
      <label className="text-white/70 text-lg">حرف:</label>
      <motion.input
        ref={inputRef}
        animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        type="text"
        maxLength={1}
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        className="w-14 h-14 text-center text-2xl font-bold rounded-xl bg-white/10 backdrop-blur border-2 border-accent-purple/50 text-white outline-none focus:border-accent-purple focus:shadow-lg focus:shadow-accent-purple/20 transition-all"
      />
      <Button type="submit" className="text-base px-5 py-3">
        تایید
      </Button>
    </form>
  )
}
