import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'

const ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
  ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
  ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و'],
]

export function PersianKeyboard() {
  const { state, dispatch } = useGame()
  const { playCorrect, playWrong, playWin, playLose } = useSound()
  const prevPhase = useRef(state.phase)

  useEffect(() => {
    if (prevPhase.current === 'PLAYING' && state.phase === 'WON') playWin()
    if (prevPhase.current === 'PLAYING' && state.phase === 'LOST') playLose()
    prevPhase.current = state.phase
  }, [state.phase, playWin, playLose])

  if (state.phase !== 'PLAYING') return null

  const handleKey = (letter: string) => {
    if (state.guessedLetters.includes(letter)) return

    const isCorrect = state.normalizedWord.includes(letter)
    dispatch({ type: 'GUESS_LETTER', payload: letter })

    if (isCorrect) {
      playCorrect()
    } else {
      playWrong()
    }
  }

  const getKeyClass = (letter: string) => {
    if (state.correctLetters.includes(letter)) return 'bg-gradient-correct text-white'
    if (state.wrongLetters.includes(letter)) return 'bg-gradient-wrong text-white/70'
    return 'bg-white/10 text-white active:bg-white/20'
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-white/5 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div dir="ltr" className="flex flex-col gap-1.5 p-2 max-w-lg mx-auto">
        {ROWS.map((row, i) => (
          <div key={i} className="flex gap-1 justify-center">
            {row.map((letter) => {
              const isGuessed = state.guessedLetters.includes(letter)
              return (
                <motion.button
                  key={letter}
                  whileTap={isGuessed ? {} : { scale: 0.9 }}
                  onClick={() => handleKey(letter)}
                  disabled={isGuessed}
                  className={`flex-1 h-10 sm:h-11 rounded-lg text-sm font-bold transition-colors ${getKeyClass(letter)} ${isGuessed ? 'opacity-70 cursor-default' : 'cursor-pointer'}`}
                >
                  {letter}
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
