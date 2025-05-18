"use client"

import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Zap, Award, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ProfileCard() {
  const { userProfile } = useAppContext()
  const [isCopied, setIsCopied] = useState(false)

  const copyAddress = () => {
    if (userProfile.walletAddress && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(userProfile.walletAddress)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  // Calculate XP progress percentage
  const nextLevelXp = (userProfile.level + 1) * 100
  const xpProgress = ((userProfile.xpBalance % 100) / 100) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600 hover:bg-purple-700">Level {userProfile.level}</Badge>
            <Badge variant="outline" className="border-gray-300 dark:border-gray-700">
              <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
              FID: {userProfile.fid}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800">
                {userProfile.profileImage ? (
                  <img
                    src={userProfile.profileImage || "/placeholder.svg"}
                    alt={userProfile.displayName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">{userProfile.displayName?.charAt(0) || "?"}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold shadow-md text-white">
                <Zap className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold">{userProfile.displayName}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">@{userProfile.username}</p>

              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <span>XP: {userProfile.xpBalance}</span>
                <span className="mx-1">•</span>
                <span>{userProfile.achievements.filter((a) => a.unlocked).length} Achievements</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Level Progress</span>
              <span className="text-gray-800 dark:text-gray-200">
                {userProfile.xpBalance % 100}/{100} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>

          <div className="bg-gray-200/70 dark:bg-gray-800/70 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Wallet</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-mono">{userProfile.walletAddress}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={copyAddress}
                >
                  <Copy className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">MON Balance</span>
              <span className="text-sm font-medium">{userProfile.monBalance} MON</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">XP Balance</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{userProfile.xpBalance} XP</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Award className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
              Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <ExternalLink className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400" />
              Warpcast
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
