"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface HuntDifficultyProps {
  difficulty: "easy" | "medium" | "hard"
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void
}

export function HuntDifficulty({ difficulty, setDifficulty }: HuntDifficultyProps) {
  return (
    <div className="bg-gray-100/70 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-300/50 dark:border-gray-700">
      <h3 className="font-medium mb-3">Select Difficulty</h3>
      <RadioGroup value={difficulty} onValueChange={setDifficulty} className="grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="easy"
            id="easy"
            className="text-green-500 dark:text-green-400 border-green-500 dark:border-green-400 focus:ring-green-500 dark:focus:ring-green-400"
          />
          <Label htmlFor="easy" className="text-green-600 dark:text-green-400 cursor-pointer">
            Easy
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="medium"
            id="medium"
            className="text-yellow-500 dark:text-yellow-400 border-yellow-500 dark:border-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-400"
          />
          <Label htmlFor="medium" className="text-yellow-600 dark:text-yellow-400 cursor-pointer">
            Medium
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="hard"
            id="hard"
            className="text-red-500 dark:text-red-400 border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400"
          />
          <Label htmlFor="hard" className="text-red-600 dark:text-red-400 cursor-pointer">
            Hard
          </Label>
        </div>
      </RadioGroup>
      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div className="text-gray-600 dark:text-gray-400">
          <span className="block">• 15 min time limit</span>
          <span className="block">• Basic clues</span>
          <span className="block">• 1x points</span>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          <span className="block">• 10 min time limit</span>
          <span className="block">• Harder clues</span>
          <span className="block">• 1.5x points</span>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          <span className="block">• 5 min time limit</span>
          <span className="block">• Cryptic clues</span>
          <span className="block">• 2x points</span>
        </div>
      </div>
    </div>
  )
}
