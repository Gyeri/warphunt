"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Award, History, LogOut, Settings, User, Zap } from "lucide-react"

export function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Mock user data
  const user = {
    name: "CryptoHunter",
    level: 3,
    huntsCompleted: 2,
    xp: 350,
    nextLevelXp: 500,
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full h-9 w-9 bg-gray-200/70 dark:bg-gray-800/50 hover:bg-gray-300/70 dark:hover:bg-gray-700/50"
        >
          <div className="flex items-center justify-center w-full h-full">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white">
            {user.level}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Level {user.level} Hunter</span>
          </div>
        </DropdownMenuLabel>
        <div className="px-2 py-1.5">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
            <span>XP Progress</span>
            <span>
              {user.xp}/{user.nextLevelXp}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
            ></div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>XP History</span>
          <div className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full px-1.5">
            350
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span>Achievements</span>
          <div className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs rounded-full px-1.5">
            3
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <History className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span>Hunt History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
