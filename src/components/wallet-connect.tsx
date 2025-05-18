"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown, Copy, ExternalLink, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  hasEthereumProvider,
  getAccounts,
  requestAccounts,
  formatAddress,
  addAccountsChangedListener,
  removeAccountsChangedListener,
} from "@/lib/ethereum"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (hasEthereumProvider()) {
          const accounts = await getAccounts()

          if (accounts && accounts.length > 0) {
            setAddress(formatAddress(accounts[0]))
            setIsConnected(true)
          }

          // Listen for account changes
          addAccountsChangedListener(handleAccountsChanged)
        }
      } catch (err) {
        console.error("Failed to check wallet connection:", err)
      }
    }

    checkConnection()

    // Cleanup listener on unmount
    return () => {
      removeAccountsChangedListener(handleAccountsChanged)
    }
  }, [])

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      // User disconnected their wallet
      setIsConnected(false)
      setAddress("")
    } else {
      // User switched accounts
      setAddress(formatAddress(accounts[0]))
      setIsConnected(true)
    }
  }

  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!hasEthereumProvider()) {
        throw new Error("No Ethereum wallet found. Please install MetaMask or another compatible wallet.")
      }

      const accounts = await requestAccounts()

      if (accounts && accounts.length > 0) {
        setAddress(formatAddress(accounts[0]))
        setIsConnected(true)
      } else {
        throw new Error("No accounts found. Please unlock your wallet and try again.")
      }
    } catch (err: any) {
      console.error("Failed to connect wallet:", err)
      setError(err.message || "Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    // Note: Most wallets don't support programmatic disconnection
    // We can only "forget" the connection in our app
    setIsConnected(false)
    setAddress("")
  }

  const copyAddress = () => {
    // In a real implementation, we would copy the full address
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  if (!isConnected) {
    return (
      <div className="space-y-2">
        <Button
          onClick={connectWallet}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-purple-600/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse mr-2">•••</span>
              Connecting
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>

        {error && (
          <Alert className="bg-red-100/50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30 text-sm">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300 ml-2">{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-200/70 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 hover:bg-gray-300/70 dark:hover:bg-gray-700/50 rounded-lg"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{address}</span>
          <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Monad Balance</span>
            <span className="font-medium">0.05 ETH</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">XP Balance</span>
            <span className="font-medium">350 XP</span>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={copyAddress}>
          <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span>{isCopied ? "Copied!" : "Copy Address"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
          onClick={disconnectWallet}
        >
          <Wallet className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
