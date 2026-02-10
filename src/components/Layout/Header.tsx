import { HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onHelp: () => void
}

export function Header({ onHelp }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <h1 className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
        حدس بزن!
      </h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onHelp}
        className="p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
      >
        <HelpCircle size={22} className="text-white/70" />
      </motion.button>
    </header>
  )
}
