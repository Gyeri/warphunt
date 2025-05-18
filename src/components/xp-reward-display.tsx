"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

interface XpRewardDisplayProps {
  xpAmount: number
}

export function XpRewardDisplay({ xpAmount }: XpRewardDisplayProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  // Animate the XP counter
  useEffect(() => {
    if (!isAnimating) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2000, 1)
      setCount(Math.floor(progress * xpAmount))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setIsAnimating(false)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [xpAmount, isAnimating])

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative mb-4">
        <motion.div
          className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-blue-600/20 overflow-hidden relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] opacity-10 mix-blend-overlay"></div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
              <Zap className="h-12 w-12 text-yellow-300" />
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-1">Experience Gained</h3>

            <div className="flex items-center justify-center mt-2">
              <motion.div
                className="text-4xl font-bold text-white"
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                +{count}
              </motion.div>
              <span className="text-2xl text-white/80 ml-2">XP</span>
            </div>

            <p className="text-sm text-white/70 text-center mt-2">Your hunter profile has been upgraded!</p>
          </motion.div>

          {/* Animated particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: Math.random() * 2,
              }}
              style={{
                top: `${50 + Math.random() * 10 - 5}%`,
                left: `${50 + Math.random() * 10 - 5}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-[10px] bg-black/20 blur-md rounded-full"></div>
      </div>

      <div className="text-center text-gray-700 dark:text-gray-300 text-sm">
        Complete more hunts to earn XP and level up your hunter profile
      </div>
    </div>
  )
}
