"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ClueDisplay } from "@/components/clue-display"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Trophy, ArrowRight, Clock, Users, Zap, Award, Star } from "lucide-react"
import { HuntLeaderboard } from "@/components/hunt-leaderboard"
import { AchievementsList } from "@/components/achievements-list"
import { HuntDifficulty } from "@/components/hunt-difficulty"
import { WalletFallback } from "@/components/wallet-fallback"
import { motion } from "framer-motion"
import { hasEthereumProvider, requestAccounts } from "@/lib/ethereum"

export function GameStart() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [huntDifficulty, setHuntDifficulty] = useState<"easy" | "medium" | "hard">("medium") // Explicitly typed
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [score, setScore] = useState(0)
  const [hasWallet, setHasWallet] = useState(true) // Default to true, will check in useEffect
  const totalSteps = 5

  // Check for wallet availability
  useEffect(() => {
    const checkWallet = () => {
      setHasWallet(hasEthereumProvider())
    }

    checkWallet()

    // Also check when the window gets focus, in case user installed wallet
    if (typeof window !== "undefined") {
      window.addEventListener("focus", checkWallet)

      return () => {
        window.removeEventListener("focus", checkWallet)
      }
    }
  }, [])

  // Timer effect when game is started
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [gameStarted, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startGame = async () => {
    // Check if wallet is available and connected
    if (hasEthereumProvider()) {
      try {
        // Request accounts to ensure wallet is connected
        const accounts = await requestAccounts()

        if (accounts && accounts.length > 0) {
          // In real implementation, call the contract's startHunt() function
          setGameStarted(true)
          setCurrentStep(1)
          setScore(0)

          // Set time based on difficulty
          if (huntDifficulty === "easy") setTimeRemaining(900) // 15 minutes
          if (huntDifficulty === "medium") setTimeRemaining(600) // 10 minutes
          if (huntDifficulty === "hard") setTimeRemaining(300) // 5 minutes
        }
      } catch (err) {
        console.error("Failed to start game:", err)
        // Handle error (could show a notification)
      }
    } else {
      setHasWallet(false)
    }
  }

  const addPoints = (points: number) => {
    setScore((prev) => prev + points)
  }

  // If no wallet is detected, show the wallet fallback component
  if (!hasWallet) {
    return <WalletFallback />
  }

  if (!gameStarted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Tabs defaultValue="hunt" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-200/70 dark:bg-gray-800/50">
            <TabsTrigger value="hunt" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Hunt
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hunt">
            <Card className="bg-white/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Welcome to WarpHunt
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-lg">
                  A treasure hunt through your Warpcast social graph
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-100/70 dark:bg-gray-800/70 p-6 rounded-lg border border-gray-300/50 dark:border-purple-500/20 shadow-inner">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    How to Play
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                        1
                      </div>
                      <span>Connect your wallet to start the hunt</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                        2
                      </div>
                      <span>Solve clues based on your friends' Warpcast posts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                        3
                      </div>
                      <span>Sign transactions to verify your progress on Monad</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                        4
                      </div>
                      <span>Complete all steps to claim XP and level up</span>
                    </li>
                  </ul>
                </div>

                <HuntDifficulty difficulty={huntDifficulty} setDifficulty={setHuntDifficulty} />

                <div className="flex items-center justify-center gap-3 py-3 px-4 bg-yellow-50/50 dark:bg-yellow-900/20 border border-yellow-200/70 dark:border-yellow-500/30 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <span className="text-yellow-700 dark:text-yellow-200">
                    Complete the hunt to earn XP and level up!
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-medium shadow-lg shadow-purple-600/20 group text-white"
                >
                  Start the Hunt
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <HuntLeaderboard />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsList
              achievements={[
                {
                  id: "1", // Changed from number to string
                  name: "First Hunt",
                  description: "Complete your first treasure hunt",
                  unlocked: true,
                  date: "May 12, 2023",
                  icon: "trophy",
                },
                {
                  id: "2", // Changed from number to string
                  name: "Speed Demon",
                  description: "Complete a hunt in under 5 minutes",
                  unlocked: true,
                  date: "May 15, 2023",
                  icon: "clock",
                },
                {
                  id: "3", // Changed from number to string
                  name: "Perfect Score",
                  description: "Complete a hunt without using any hints",
                  unlocked: true,
                  date: "May 20, 2023",
                  icon: "target",
                },
                {
                  id: "4", // Changed from number to string
                  name: "Hard Mode Master",
                  description: "Complete a hunt on hard difficulty",
                  unlocked: false,
                  icon: "flame",
                },
                {
                  id: "5", // Changed from number to string
                  name: "Collector",
                  description: "Earn 500 XP from hunts",
                  unlocked: false,
                  icon: "award",
                },
                {
                  id: "6", // Changed from number to string
                  name: "No Hints Needed",
                  description: "Complete 3 hunts without using any hints",
                  unlocked: false,
                  icon: "lightbulb",
                },
                {
                  id: "7", // Changed from number to string
                  name: "Top Hunter",
                  description: "Reach level 5",
                  unlocked: false,
                  icon: "zap",
                },
              ]}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
        timeRemaining={timeRemaining} onHuntCompleted={function (): void {
          throw new Error("Function not implemented.")
        } }      />
    </motion.div>
  )
}
