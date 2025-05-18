"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Home, Loader2, Sparkles, Zap } from "lucide-react"
import { XpRewardDisplay } from "@/components/xp-reward-display"
import { Confetti } from "@/components/confetti"
import { TransactionModal } from "@/components/transaction-modal"

export function RewardLayer() {
  const { setCurrentLayer, huntDifficulty, huntScore, earnedXp, refreshProfile } = useAppContext()

  const [isXpClaimed, setIsXpClaimed] = useState(false)
  const [isClaimingXp, setIsClaimingXp] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showTxModal, setShowTxModal] = useState(false)

  const handleClaimXp = () => {
    setShowTxModal(true)
  }

  const handleConfirmTransaction = async () => {
    setShowTxModal(false)
    setIsClaimingXp(true)

    // Simulate XP claiming process
    setTimeout(async () => {
      setIsClaimingXp(false)
      setIsXpClaimed(true)
      setShowConfetti(true)

      // Update user profile with new XP and achievements
      await refreshProfile()

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    }, 2000)
  }

  const handleGoHome = () => {
    setCurrentLayer("profile")
  }

  return (
    <>
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gray-100/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x"></div>

          <CardHeader className="text-center pb-2">
            <Badge className="mx-auto mb-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Hunt Completed
            </Badge>
            <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">
              🎉 Congratulations! 🎉
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 flex flex-col items-center pt-4">
            {isXpClaimed ? (
              <XpRewardDisplay xpAmount={earnedXp} />
            ) : (
              <div className="w-40 h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                </div>
                <Zap className="h-20 w-20 text-yellow-300" />
              </div>
            )}

            {isXpClaimed ? (
              <div className="space-y-4 w-full">
                <div className="bg-green-100/50 dark:bg-green-900/30 border border-green-200/70 dark:border-green-500/30 rounded-lg p-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 dark:text-green-300">XP Successfully Claimed!</p>
                </div>

                <div className="bg-gray-200/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="font-medium text-center mb-2">Hunt Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                      <span
                        className={
                          huntDifficulty === "easy"
                            ? "text-green-600 dark:text-green-400"
                            : huntDifficulty === "medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                        }
                      >
                        {huntDifficulty.charAt(0).toUpperCase() + huntDifficulty.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Total Score</span>
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">{huntScore}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">XP Earned</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">+{earnedXp} XP</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">New Achievement</span>
                      <span className="text-purple-600 dark:text-purple-400">Hunt Master</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Congratulations! You've completed all the clues in the WarpHunt. You can now claim XP points to level
                  up your hunter profile.
                </p>

                <div className="bg-gray-200/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="font-medium text-center mb-2">Hunt Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                      <span
                        className={
                          huntDifficulty === "easy"
                            ? "text-green-600 dark:text-green-400"
                            : huntDifficulty === "medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                        }
                      >
                        {huntDifficulty.charAt(0).toUpperCase() + huntDifficulty.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Total Score</span>
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">{huntScore}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Potential XP</span>
                      <span className="text-blue-600 dark:text-blue-400">~{earnedXp} XP</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">New Achievement</span>
                      <span className="text-purple-600 dark:text-purple-400">Hunt Master</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {isXpClaimed ? (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-medium shadow-lg shadow-purple-600/20 text-white"
                onClick={handleGoHome}
              >
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-medium shadow-lg shadow-purple-600/20 text-white"
                onClick={handleClaimXp}
                disabled={isClaimingXp}
              >
                {isClaimingXp ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Claiming XP...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Claim XP Reward
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <TransactionModal
        isOpen={showTxModal}
        onClose={() => setShowTxModal(false)}
        onConfirm={handleConfirmTransaction}
        step={6}
        isXpClaim={true}
      />
    </>
  )
}
