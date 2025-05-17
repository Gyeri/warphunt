"use client"

import { useAppContext } from "@/context/app-context"
import { ProfileLayer } from "@/components/layers/profile-layer"
import { HuntLayer } from "@/components/layers/hunt-layer"
import { RewardLayer } from "@/components/layers/reward-layer"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const { currentLayer } = useAppContext()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-800 dark:bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-xs font-bold shadow-md text-white">
                H
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                WarpHunt
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Treasure hunt on Monad</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {currentLayer === "profile" && <ProfileLayer key="profile" />}
          {currentLayer === "hunt" && <HuntLayer key="hunt" />}
          {currentLayer === "reward" && <RewardLayer key="reward" />}
        </AnimatePresence>
      </div>
    </main>
  )
}
