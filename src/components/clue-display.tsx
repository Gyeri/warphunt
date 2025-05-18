"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Loader2, Clock, Lightbulb, Sparkles } from "lucide-react"
import { TransactionModal } from "@/components/transaction-modal"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface ClueDisplayProps {
  step: number
  setStep: (step: number) => void
  addPoints: (points: number) => void
  difficulty: string
  timeRemaining: number
  onHuntCompleted: () => void
}

export function ClueDisplay({
  step,
  setStep,
  addPoints,
  difficulty,
  timeRemaining,
  onHuntCompleted,
}: ClueDisplayProps) {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showTxModal, setShowTxModal] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const [hintCount, setHintCount] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const totalSteps = 5

  // Reset state when step changes
  useEffect(() => {
    setAnswer("")
    setIsCorrect(null)
    setHintUsed(false)
    setShowHint(false)
  }, [step])

  // Points calculation based on difficulty
  const getPointsForStep = () => {
    const basePoints = 100
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2
    const timeBonus = Math.floor(timeRemaining / 10)
    const hintPenalty = hintUsed ? 0.7 : 1

    return Math.floor((basePoints * difficultyMultiplier + timeBonus) * hintPenalty)
  }

  // Mock clues - in real app these would come from your backend
  const clues = [
    "",
    "Find the post from your friend that starts with 'Just launched my new...'",
    "Look for a post containing the hashtag #MonadTestnet",
    "Look for a post with exactly 3 emoji reactions",
    "Look for a post mentioning 'web3 gaming'",
    "Find the most recent post from your oldest Warpcast connection",
  ]

  // Mock hints
  const hints = [
    "",
    "This post was made by someone whose username starts with 'crypto'",
    "This post also mentions 'blockchain performance'",
    "The post has a 🔥 reaction",
    "The post includes a screenshot of a game",
    "Check posts from users who joined Warpcast in 2022",
  ]

  // Safely get clue text
  const getClueText = (index: number): string => {
    if (!clues || !clues[index]) {
      return "Loading clue..."
    }
    return clues[index]
  }

  // Safely get hint text
  const getHintText = (index: number): string => {
    if (!hints || !hints[index]) {
      return "Hint not available"
    }
    return hints[index]
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setAttempts((prev) => prev + 1)

    // Simulate API call to verify answer
    setTimeout(() => {
      setIsSubmitting(false)
      // For demo purposes, any non-empty answer is "correct"
      if (answer && answer.trim()) {
        setIsCorrect(true)
        // Add points when correct
        addPoints(getPointsForStep())
      } else {
        setIsCorrect(false)
      }
    }, 1500)
  }

  const proceedToNextStep = () => {
    setShowTxModal(true)
  }

  const handleConfirmTransaction = () => {
    setShowTxModal(false)

    if (step >= totalSteps) {
      // Hunt completed
      onHuntCompleted()
    } else {
      // Move to next step
      setStep(step + 1)
    }
  }

  const useHint = () => {
    setHintUsed(true)
    setHintCount((prev) => prev + 1)
    setShowHint(true)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-100/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x"></div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Clue #{step}</Badge>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-gray-400 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1 text-red-500 dark:text-red-400" />
                    Points: {getPointsForStep()}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                          onClick={useHint}
                          disabled={hintUsed}
                        >
                          <Lightbulb
                            className={`h-4 w-4 ${hintUsed ? "text-gray-500" : "text-yellow-500 dark:text-yellow-400"}`}
                          />
                          <span className="sr-only">Use hint</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>{hintUsed ? "Hint used" : "Use a hint (reduces points)"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <CardTitle className="text-xl mt-2">Find this Warpcast post</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-gray-200/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-inner">
                <p className="text-gray-700 dark:text-gray-300">{getClueText(step)}</p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="bg-yellow-50/50 dark:bg-yellow-900/20 border border-yellow-200/70 dark:border-yellow-500/30 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 mb-1">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">Hint:</span>
                  </div>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">{getHintText(step)}</p>
                </motion.div>
              )}

              <div className="space-y-2">
                <label htmlFor="answer" className="text-sm text-gray-700 dark:text-gray-300 flex justify-between">
                  <span>Enter the post ID or hash:</span>
                  {attempts > 0 && <span className="text-gray-600 dark:text-gray-400">Attempts: {attempts}</span>}
                </label>
                <div className="flex gap-2">
                  <Input
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Paste the post ID here..."
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !answer.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {isCorrect === true && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-green-50/50 dark:bg-green-900/30 border border-green-200/70 dark:border-green-500/30 rounded-lg p-3 flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                    <span className="text-green-700 dark:text-green-300">
                      Correct! Sign the transaction to proceed.
                    </span>
                  </motion.div>
                )}

                {isCorrect === false && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-red-50/50 dark:bg-red-900/30 border border-red-200/70 dark:border-red-500/30 rounded-lg p-3 flex items-center gap-2"
                  >
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                    <span className="text-red-700 dark:text-red-300">That's not the right post. Try again!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter>
              <Button
                onClick={proceedToNextStep}
                disabled={isCorrect !== true}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-11 text-white"
              >
                {step >= totalSteps ? (
                  <span className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Complete Hunt
                  </span>
                ) : (
                  "Proceed to Next Step"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <TransactionModal
        isOpen={showTxModal}
        onClose={() => setShowTxModal(false)}
        onConfirm={handleConfirmTransaction}
        step={step}
        isXpClaim={step >= totalSteps}
      />
    </>
  )
}
