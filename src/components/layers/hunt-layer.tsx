"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ClueDisplay } from "@/components/clue-display"
import { Clock, Zap, Star } from "lucide-react"

export function HuntLayer() {
  const { setCurrentLayer, huntDifficulty, setHuntCompleted, setHuntScore, setEarnedXp } = useAppContext()

  const [currentStep, setCurrentStep] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [score, setScore] = useState(0)
  const totalSteps = 5

  // Set time based on difficulty
  useEffect(() => {
    if (huntDifficulty === "easy") setTimeRemaining(900) // 15 minutes
    if (huntDifficulty === "medium") setTimeRemaining(600) // 10 minutes
    if (huntDifficulty === "hard") setTimeRemaining(300) // 5 minutes
  }, [huntDifficulty])

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else {
      // Time's up - handle failure
      handleHuntFailed()
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const addPoints = (points: number) => {
    setScore((prev) => prev + points)
  }

  const handleHuntCompleted = () => {
    // Calculate XP reward based on score, difficulty, and time
    const baseXp = 50
    const difficultyBonus = huntDifficulty === "easy" ? 0 : huntDifficulty === "medium" ? 25 : 50
    const timeBonus = Math.floor(timeRemaining / 20)

    const earnedXp = baseXp + difficultyBonus + timeBonus

    // Update app context
    setHuntCompleted(true)
    setHuntScore(score)
    setEarnedXp(earnedXp)

    // Navigate to reward layer
    setCurrentLayer("reward")
  }

  const handleHuntFailed = () => {
    // Handle hunt failure - for now, just go back to profile
    setCurrentLayer("profile")
  }

  const handleQuit = () => {
    if (confirm("Are you sure you want to quit the hunt? All progress will be lost.")) {
      setCurrentLayer("profile")
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-100/50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-300 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500 dark:text-yellow-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                Hunt Progress
              </span>
            </h2>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            Step <span className="text-gray-900 dark:text-white font-bold">{currentStep}</span> of{" "}
            <span className="text-gray-900 dark:text-white font-bold">{totalSteps}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
            <Clock className="h-4 w-4 text-red-500 dark:text-red-400" />
            <span
              className={`font-mono font-bold ${
                timeRemaining < 60 ? "text-red-500 dark:text-red-400 animate-pulse" : "text-gray-900 dark:text-white"
              }`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
            <span className="font-bold text-gray-900 dark:text-white">{score}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">pts</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleQuit}
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Quit
          </Button>
        </div>
      </div>

      <div className="relative">
        <Progress value={(currentStep / totalSteps) * 100} className="h-3 bg-gray-200 dark:bg-gray-800" />

        {/* Step markers */}
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold -mt-1.5 border-2 ${
              i + 1 < currentStep
                ? "bg-purple-600 border-purple-400 text-white"
                : i + 1 === currentStep
                  ? "bg-blue-600 border-blue-400 text-white animate-pulse"
                  : "bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            }`}
            style={{ left: `calc(${(i / (totalSteps - 1)) * 100}% - 12px)` }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <ClueDisplay
        step={currentStep}
        setStep={setCurrentStep}
        addPoints={addPoints}
        difficulty={huntDifficulty}
        timeRemaining={timeRemaining}
        onHuntCompleted={handleHuntCompleted}
      />
    </motion.div>
  )
}
