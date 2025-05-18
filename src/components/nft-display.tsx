"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, ExternalLink, Copy, Sparkles } from "lucide-react"

export function NftDisplay() {
  const [isRotating, setIsRotating] = useState(false)

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative mb-4">
        <motion.div
          className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg shadow-purple-600/20 overflow-hidden relative"
          animate={isRotating ? { rotateY: 360 } : { rotateY: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onClick={() => setIsRotating(!isRotating)}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-300" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-1">WarpHunt Champion</h3>
            <p className="text-sm text-white/70 text-center">Exclusive NFT for completing the treasure hunt</p>

            <div className="absolute bottom-3 left-3">
              <Badge className="bg-black/30 backdrop-blur-sm text-white/90 hover:bg-black/40">#1337</Badge>
            </div>

            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Rare
              </Badge>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 text-xs text-white/70">Click to rotate</div>
        </motion.div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-[10px] bg-black/20 blur-md rounded-full"></div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-800/70 p-3 rounded-lg border border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Token ID</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-mono">#1337</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-gray-700">
              <Copy className="h-3 w-3 text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper component for the Trophy icon
function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
