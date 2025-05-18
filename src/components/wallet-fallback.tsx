"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function WalletFallback() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <Card className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 border-purple-500/30 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">No Wallet Detected</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            You need a Web3 wallet to play WarpHunt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            WarpHunt requires a Web3 wallet like MetaMask to interact with the Monad blockchain. Please install a wallet
            to continue.
          </p>

          <div className="flex flex-col gap-2">
            <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Download className="mr-2 h-4 w-4" />
                Install MetaMask
              </Button>
            </a>

            <a href="https://ethereum.org/en/wallets/find-wallet/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Explore Other Wallets
              </Button>
            </a>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 dark:text-gray-400 text-center">
          After installing a wallet, please refresh this page.
        </CardFooter>
      </Card>
    </motion.div>
  )
}
