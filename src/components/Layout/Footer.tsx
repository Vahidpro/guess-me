import { Share2, Info } from 'lucide-react'
import { useShare } from '../../hooks/useShare'
import { useGame } from '../../context/GameContext'

export function Footer() {
  const share = useShare()
  const { state } = useGame()

  return (
    <footer className="flex justify-center gap-4 px-4 py-3 mt-auto">
      <button
        onClick={() => share(state.score)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white/90 text-sm cursor-pointer"
      >
        <Share2 size={16} />
        اشتراک‌گذاری
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white/90 text-sm cursor-pointer">
        <Info size={16} />
        درباره
      </button>
    </footer>
  )
}
