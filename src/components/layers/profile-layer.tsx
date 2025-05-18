"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Trophy, ArrowRight, Users, Award, Wallet, AlertTriangle } from "lucide-react"
import { HuntLeaderboard } from "@/components/hunt-leaderboard"
import { AchievementsList } from "@/components/achievements-list"
import { HuntDifficulty } from "@/components/hunt-difficulty"
import { ProfileCard } from "@/components/profile-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WalletFallback } from "@/components/wallet-fallback"
import { hasEthereumProvider } from "@/lib/ethereum"

export function ProfileLayer() {
  const { isWalletConnected, connectWallet, setCurrentLayer, huntDifficulty, setHuntDifficulty, userProfile } =
    useAppContext()

  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasWallet, setHasWallet] = useState(hasEthereumProvider())

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const success = await connectWallet()
      if (!success) {
        setError("Failed to connect wallet. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleStartHunt = () => {
    setCurrentLayer("hunt")
  }

  if (!hasWallet) {
    return <WalletFallback />
  }

  if (!isWalletConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <Card className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
              Welcome to WarpHunt
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Connect your wallet to start the adventure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-100/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300/50 dark:border-gray-700 shadow-inner">
              <h3 className="font-medium mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                What is WarpHunt?
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                WarpHunt is a treasure hunt game that combines your Warpcast social graph with the Monad blockchain.
                Solve clues, find posts, and earn XP to level up your hunter profile!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={handleConnectWallet}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-medium shadow-lg shadow-purple-600/20 text-white"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <span className="animate-pulse mr-2">•••</span>
                    Connecting
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </span>
                )}
              </Button>

              {error && (
                <Alert className="bg-red-100/50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300 ml-2 text-sm">{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>

        <div className="md:col-span-2">
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
                  <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                    Start a New Hunt
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                    Solve clues, find posts, earn XP
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-100/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300/50 dark:border-purple-500/20 shadow-inner">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                      How to Play
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                          1
                        </div>
                        <span>Solve clues based on your friends' Warpcast posts</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                          2
                        </div>
                        <span>Sign transactions to verify your progress on Monad</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 shadow-md shadow-purple-600/20">
                          3
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
                    onClick={handleStartHunt}
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
              <AchievementsList achievements={userProfile.achievements} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}
