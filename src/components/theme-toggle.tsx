"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 bg-gray-800/50 hover:bg-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 light:bg-gray-200/50 light:hover:bg-gray-300/50"
    >
      {isDark ? <Moon className="h-5 w-5 text-blue-300" /> : <Sun className="h-5 w-5 text-yellow-500" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
