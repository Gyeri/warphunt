"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function HuntLeaderboard() {
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "CryptoWizard", score: 1850, xp: 420, level: 8, difficulty: "hard", time: "4:32" },
    { rank: 2, name: "MonadMaster", score: 1720, xp: 380, level: 7, difficulty: "hard", time: "5:15" },
    { rank: 3, name: "WarpCaster99", score: 1650, xp: 350, level: 6, difficulty: "medium", time: "3:45" },
    { rank: 4, name: "BlockchainBob", score: 1540, xp: 320, level: 5, difficulty: "hard", time: "6:20" },
    { rank: 5, name: "TokenTracker", score: 1480, xp: 300, level: 5, difficulty: "medium", time: "4:10" },
    { rank: 6, name: "CryptoKitty", score: 1350, xp: 280, level: 4, difficulty: "medium", time: "5:05" },
    { rank: 7, name: "HashHunter", score: 1290, xp: 260, level: 4, difficulty: "easy", time: "2:55" },
    { rank: 8, name: "NFTNinja", score: 1180, xp: 240, level: 3, difficulty: "medium", time: "5:30" },
    { rank: 9, name: "EtherExplorer", score: 1120, xp: 220, level: 3, difficulty: "easy", time: "3:15" },
    { rank: 10, name: "GasGuru", score: 980, xp: 200, level: 2, difficulty: "easy", time: "4:25" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 dark:text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600 dark:text-amber-500" />
      default:
        return <span className="text-gray-600 dark:text-gray-400 font-mono">{rank}</span>
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "hard":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-purple-500/30 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Top Hunters
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            The most skilled and experienced treasure hunters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-2 text-sm text-gray-600 dark:text-gray-400 px-2 py-1 border-b border-gray-200 dark:border-gray-800">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3">Hunter</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-right">XP</div>
              <div className="col-span-2 text-center">Difficulty</div>
              <div className="col-span-2 text-right">Score</div>
            </div>

            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`grid grid-cols-12 gap-2 px-2 py-2 rounded-lg ${
                  entry.rank <= 3 ? "bg-gray-100/70 dark:bg-gray-800/50" : ""
                } hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors`}
              >
                <div className="col-span-1 flex justify-center items-center">{getRankIcon(entry.rank)}</div>
                <div className="col-span-3 font-medium">{entry.name}</div>
                <div className="col-span-2 text-center flex items-center justify-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{entry.level}</span>
                    <div className="w-4 h-4 bg-purple-600 rounded-full text-[8px] flex items-center justify-center text-white ml-1">
                      <Zap className="h-2.5 w-2.5" />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono font-bold text-blue-600 dark:text-blue-400">
                  {entry.xp}
                </div>
                <div className={`col-span-2 text-center ${getDifficultyColor(entry.difficulty)}`}>
                  {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}
                </div>
                <div className="col-span-2 text-right font-mono text-yellow-600 dark:text-yellow-400">
                  {entry.score}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
