import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { SetupForm } from "./components/Setup/SetupForm";
import { GameBoard } from "./components/Game/GameBoard";
import { PersianKeyboard } from "./components/Game/PersianKeyboard";
import { Modal } from "./components/ui/Modal";

function GameView() {
	const { state } = useGame();
	const [showHelp, setShowHelp] = useState(false);
	const [showAbout, setShowAbout] = useState(false);

	return (
		<div className="min-h-dvh flex flex-col font-vazir bg-gradient-main text-white">
			<Header onHelp={() => setShowHelp(true)} />

			<main className={`flex-1 flex items-center justify-center p-4 ${state.phase !== "SETUP" ? "pb-44" : ""}`}>
				<AnimatePresence mode="wait">
					{state.phase === "SETUP" ? (
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

			<PersianKeyboard />
			<Footer onAbout={() => setShowAbout(true)} />

			<Modal
				open={showHelp}
				onClose={() => setShowHelp(false)}
			>
				<h2 className="text-2xl font-bold mb-5 text-white">🎯 چطوری بازی کنیم؟</h2>
				<div className="space-y-3 text-white/90 text-base leading-relaxed">
					<p>📋 اول یه دسته‌بندی انتخاب کن</p>
					<p>✍️ بعد کلمه‌ای که مد نظرته رو بنویس</p>
					<p>📱 گوشی رو بده به رفیقت</p>
					<p>🔤 حروف رو یکی یکی حدس بزنه</p>
					<p>🏆 قبل از اینکه شانسا تموم بشه کلمه رو پیدا کنه!</p>
				</div>
			</Modal>

			<Modal
				open={showAbout}
				onClose={() => setShowAbout(false)}
			>
				<h2 className="text-2xl font-bold mb-5 text-white">✨ درباره بازی</h2>
				<div className="space-y-4 text-white/90 text-base leading-relaxed">
					<p className="text-white/70">
						🎮 <span className="font-bold text-white">حدس بزن!</span> یه بازی باحال
						حدس کلمه فارسیه که توش باید با حدس زدن حروف، کلمه مخفی رو پیدا کنی!
					</p>
					<div className="border-t border-white/10 pt-4">
						<p className="text-sm text-white/50">📦 نسخه ۲.۰.۳</p>
						<p className="text-sm text-white/50 mt-1">
							👨‍💻 ساخته شده توسط{" "}
							<a
								href="https://github.com/Vahidpro"
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent-cyan hover:text-white transition-colors underline underline-offset-2"
							>
								Vahidpro
							</a>
						</p>
					</div>
				</div>
			</Modal>

			{/* Background decorative blurs */}
			<div className="fixed top-20 right-20 w-72 h-72 bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
			<div className="fixed bottom-20 left-20 w-72 h-72 bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none" />
		</div>
	);
}

export default function App() {
	return (
		<GameProvider>
			<GameView />
		</GameProvider>
	);
}
