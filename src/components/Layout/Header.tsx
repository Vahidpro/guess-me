import { Sun, Moon, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  onHelp: () => void
}

export function Header({ onHelp }: HeaderProps) {
  const { theme, toggle } = useTheme()

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onHelp}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <HelpCircle size={22} className="text-white/70" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun size={22} className="text-yellow-300" />
          ) : (
            <Moon size={22} className="text-indigo-300" />
          )}
        </motion.button>
      </div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
        حدس بزن!
      </h1>
    </header>
  )
}
