import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { SetupForm } from './components/Setup/SetupForm'
import { GameBoard } from './components/Game/GameBoard'
import { Modal } from './components/ui/Modal'

function GameView() {
  const { state } = useGame()
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col font-vazir bg-gradient-main text-white">
      <Header onHelp={() => setShowHelp(true)} />

      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {state.phase === 'SETUP' ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <SetupForm />
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <GameBoard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <h2 className="text-2xl font-bold mb-5 text-white">راهنمای بازی</h2>
        <div className="space-y-3 text-white/90 text-base leading-relaxed">
          <p>۱. از لیست، دسته‌بندی کلمه را انتخاب کنید</p>
          <p>۲. کلمه مورد نظر خود را وارد کنید</p>
          <p>۳. گوشی را به نفر دوم بدهید</p>
          <p>۴. حروف را یکی یکی حدس بزنید</p>
          <p>۵. قبل از اتمام شانس‌ها کلمه را کامل کنید!</p>
        </div>
      </Modal>

      {/* Background decorative blurs */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 left-20 w-72 h-72 bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <GameView />
      </GameProvider>
    </ThemeProvider>
  )
}
