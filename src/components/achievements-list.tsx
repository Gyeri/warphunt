"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Award, Trophy, Target, Lightbulb, Flame } from "lucide-react"
import { motion } from "framer-motion"

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  icon: string
  date?: string
}

interface AchievementsListProps {
  achievements: Achievement[]
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  // Add some default achievements if none are provided
  const allAchievements =
    achievements.length > 0
      ? achievements
      : [
          {
            id: 1,
            name: "First Hunt",
            description: "Complete your first treasure hunt",
            unlocked: true,
            date: "May 12, 2023",
            icon: "trophy",
          },
          {
            id: 2,
            name: "Speed Demon",
            description: "Complete a hunt in under 5 minutes",
            unlocked: true,
            date: "May 15, 2023",
            icon: "clock",
          },
          {
            id: 3,
            name: "Perfect Score",
            description: "Complete a hunt without using any hints",
            unlocked: true,
            date: "May 20, 2023",
            icon: "target",
          },
          {
            id: 4,
            name: "Hard Mode Master",
            description: "Complete a hunt on hard difficulty",
            unlocked: false,
            icon: "flame",
          },
          {
            id: 5,
            name: "Collector",
            description: "Earn 500 XP from hunts",
            unlocked: false,
            icon: "award",
          },
          {
            id: 6,
            name: "No Hints Needed",
            description: "Complete 3 hunts without using any hints",
            unlocked: false,
            icon: "lightbulb",
          },
          {
            id: 7,
            name: "Top Hunter",
            description: "Reach level 5",
            unlocked: false,
            icon: "zap",
          },
        ]

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case "clock":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "target":
        return <Target className="h-5 w-5 text-green-400" />
      case "flame":
        return <Flame className="h-5 w-5 text-red-400" />
      case "award":
        return <Award className="h-5 w-5 text-purple-400" />
      case "lightbulb":
        return <Lightbulb className="h-5 w-5 text-yellow-400" />
      case "zap":
        return <Zap className="h-5 w-5 text-blue-400" />
      default:
        return <Award className="h-5 w-5 text-purple-400" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-100/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Achievements
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Track your progress and unlock special rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  achievement.unlocked
                    ? "bg-gray-200/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                    : "bg-gray-100/50 dark:bg-gray-900/50 border-gray-300/50 dark:border-gray-800/50 opacity-60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-gray-300/50 dark:bg-gray-700/50"
                      : "bg-gray-200/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-600"
                  }`}
                >
                  {getIconComponent(achievement.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{achievement.name}</h3>
                    {achievement.unlocked ? (
                      <Badge className="bg-green-600 hover:bg-green-700">Unlocked</Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-gray-400 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        Locked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Unlocked on {achievement.date}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
