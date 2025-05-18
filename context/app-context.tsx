"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { hasEthereumProvider, getAccounts, formatAddress } from "@/lib/ethereum"

type AppLayer = "profile" | "hunt" | "reward"

type UserProfile = {
  fid: string | null
  username: string | null
  displayName: string | null
  profileImage: string | null
  walletAddress: string | null
  monBalance: string | null
  xpBalance: number
  level: number
  achievements: Achievement[]
}

type Achievement = {
  id: number
  name: string
  description: string
  unlocked: boolean
  date?: string
  icon: string
}

type AppContextType = {
  currentLayer: AppLayer
  setCurrentLayer: (layer: AppLayer) => void
  isWalletConnected: boolean
  connectWallet: () => Promise<boolean>
  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
  huntCompleted: boolean
  setHuntCompleted: (completed: boolean) => void
  huntScore: number
  setHuntScore: (score: number) => void
  earnedXp: number
  setEarnedXp: (xp: number) => void
  huntDifficulty: string
  setHuntDifficulty: (difficulty: string) => void
  refreshProfile: () => Promise<void>
}

const defaultUserProfile: UserProfile = {
  fid: null,
  username: null,
  displayName: null,
  profileImage: null,
  walletAddress: null,
  monBalance: null,
  xpBalance: 0,
  level: 1,
  achievements: [],
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLayer, setCurrentLayer] = useState<AppLayer>("profile")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile)
  const [huntCompleted, setHuntCompleted] = useState(false)
  const [huntScore, setHuntScore] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)
  const [huntDifficulty, setHuntDifficulty] = useState("medium")

  // Check wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (hasEthereumProvider()) {
        const accounts = await getAccounts()
        if (accounts && accounts.length > 0) {
          setIsWalletConnected(true)
          // Fetch mock user data
          await fetchMockUserData(accounts[0])
        }
      }
    }

    checkConnection()
  }, [])

  // Mock function to fetch user data
  const fetchMockUserData = async (address: string) => {
    // In a real app, this would fetch data from Warpcast API
    // For now, we'll use mock data
    setUserProfile({
      fid: "42069",
      username: "cryptohunter",
      displayName: "Crypto Hunter",
      profileImage: "/placeholder.svg?height=200&width=200",
      walletAddress: formatAddress(address),
      monBalance: "0.05",
      xpBalance: 350,
      level: 3,
      achievements: [
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
          unlocked: false,
          icon: "target",
        },
      ],
    })
  }

  const connectWallet = async (): Promise<boolean> => {
    if (!hasEthereumProvider()) {
      return false
    }

    try {
      const accounts = await window.ethereum!.request({
        method: "eth_requestAccounts",
      })

      if (accounts && accounts.length > 0) {
        setIsWalletConnected(true)
        await fetchMockUserData(accounts[0])
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      return false
    }
  }

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }))
  }

  const refreshProfile = async () => {
    if (isWalletConnected && userProfile.walletAddress) {
      // In a real app, this would refresh data from APIs
      // For demo, we'll just update XP and achievements

      // Add the hunt completion achievement if not already present
      const hasCompletionAchievement = userProfile.achievements.some((a) => a.id === 4)

      if (huntCompleted && !hasCompletionAchievement) {
        const newAchievements = [...userProfile.achievements]
        newAchievements.push({
          id: 4,
          name: "Hunt Master",
          description: "Complete a treasure hunt successfully",
          unlocked: true,
          date: new Date().toLocaleDateString(),
          icon: "award",
        })

        // Calculate new level based on XP
        const newXpBalance = userProfile.xpBalance + earnedXp
        const newLevel = Math.floor(newXpBalance / 100) + 1

        updateUserProfile({
          achievements: newAchievements,
          xpBalance: newXpBalance,
          level: newLevel,
        })
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentLayer,
        setCurrentLayer,
        isWalletConnected,
        connectWallet,
        userProfile,
        updateUserProfile,
        huntCompleted,
        setHuntCompleted,
        huntScore,
        setHuntScore,
        earnedXp,
        setEarnedXp,
        huntDifficulty,
        setHuntDifficulty,
        refreshProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
