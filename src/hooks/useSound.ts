import { useCallback } from 'react'

function play(frequency: number, duration: number, type: OscillatorType = 'sine') {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = frequency
    gain.gain.value = 0.15
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Audio not supported, fail silently
  }
}

export function useSound() {
  const playCorrect = useCallback(() => {
    play(523, 0.15)
    setTimeout(() => play(659, 0.15), 100)
  }, [])

  const playWrong = useCallback(() => {
    play(200, 0.3, 'square')
  }, [])

  const playWin = useCallback(() => {
    play(523, 0.12)
    setTimeout(() => play(659, 0.12), 100)
    setTimeout(() => play(784, 0.12), 200)
    setTimeout(() => play(1047, 0.3), 300)
  }, [])

  const playLose = useCallback(() => {
    play(400, 0.2, 'sawtooth')
    setTimeout(() => play(300, 0.2, 'sawtooth'), 200)
    setTimeout(() => play(200, 0.4, 'sawtooth'), 400)
  }, [])

  return { playCorrect, playWrong, playWin, playLose }
}
