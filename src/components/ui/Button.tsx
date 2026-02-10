import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ variant = 'primary', children, className = '', type = 'button', ...props }: ButtonProps) {
  const base = 'px-6 py-3 rounded-2xl font-bold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-gradient-button text-white shadow-lg shadow-accent-purple/25',
    ghost: 'bg-white/10 backdrop-blur-sm border border-white/10 text-white',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
