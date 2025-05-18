'use client';

// filepath: /home/gyeri/warphunt/src/context/app-context.tsx
import { createContext, useContext, useState, ReactNode } from "react"

type AppContextType = {
  currentLayer: "profile" | "hunt" | "reward"
  setCurrentLayer: (layer: "profile" | "hunt" | "reward") => void
  huntDifficulty: "easy" | "medium" | "hard"
  setHuntDifficulty: (difficulty: "easy" | "medium" | "hard") => void
  setHuntCompleted: (completed: boolean) => void
  setHuntScore: (score: number) => void
  setEarnedXp: (xp: number) => void
  huntScore: number
  earnedXp: number
  isWalletConnected: boolean
  connectWallet: () => Promise<boolean>
  userProfile: {
    walletAddress: string
    level: number
    xpBalance: number
    monBalance: number
    fid: string
    profileImage?: string
    displayName?: string
    username?: string
    achievements: { id: string, name: string, description: string, unlocked: boolean, icon: string, date?: string }[]
  }
  refreshProfile: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLayer, setCurrentLayer] = useState<"profile" | "hunt" | "reward">("profile")
  const [huntDifficulty, setHuntDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [huntScore, setHuntScore] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const [userProfile, setUserProfile] = useState({
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    level: 1,
    xpBalance: 50,
    monBalance: 100,
    fid: "12345",
    profileImage: "/placeholder.svg",
    displayName: "John Doe",
    username: "johndoe",
    achievements: [
      {
        id: "1",
        name: "First Hunt",
        description: "Complete your first treasure hunt",
        unlocked: true,
        icon: "trophy",
        date: "May 12, 2023",
      },
      {
        id: "2",
        name: "Speed Demon",
        description: "Complete a hunt in under 5 minutes",
        unlocked: false,
        icon: "clock",
      },
      {
        id: "3",
        name: "Perfect Score",
        description: "Complete a hunt without using any hints",
        unlocked: false,
        icon: "target",
      },
    ],
  })

  const connectWallet = async (): Promise<boolean> => {
    try {
      setIsWalletConnected(true)
      return true
    } catch {
      setIsWalletConnected(false)
      return false
    }
  }

  const setHuntCompleted = (completed: boolean) => {
    console.log("Hunt completed:", completed)
  }

  const refreshProfile = async () => {
    console.log("Refreshing user profile...")
    // Simulate profile refresh logic
  }

  return (
    <AppContext.Provider
      value={{
        currentLayer,
        setCurrentLayer,
        huntDifficulty,
        setHuntDifficulty,
        huntScore,
        setHuntScore,
        earnedXp,
        setEarnedXp,
        isWalletConnected,
        connectWallet,
        userProfile,
        setHuntCompleted,
        refreshProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
