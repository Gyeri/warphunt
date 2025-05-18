"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertTriangle, CheckCircle, ArrowRight, Zap, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendTransaction } from "@/lib/ethereum"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  step: number
  isXpClaim?: boolean
}

export function TransactionModal({ isOpen, onClose, onConfirm, step, isXpClaim = false }: TransactionModalProps) {
  const [stage, setStage] = useState<"initial" | "signing" | "confirming" | "complete" | "error">("initial")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Reset stage when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage("initial")
      setProgress(0)
      setError(null)
    }
  }, [isOpen])

  // Progress animation
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (stage === "signing") {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            setStage("confirming")
            clearInterval(interval)
          }
          return newProgress
        })
      }, 20)
    } else if (stage === "confirming") {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            setStage("complete")
            clearInterval(interval)
          }
          return newProgress
        })
      }, 30)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [stage])

  // Auto-confirm after completion
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (stage === "complete") {
      timeout = setTimeout(() => {
        onConfirm()
      }, 1000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [stage, onConfirm])

  const handleSign = async () => {
    try {
      setStage("signing")

      // Create transaction parameters based on the action
      const txParams = {
        to: "0x1234567890123456789012345678901234567890", // Mock contract address
        value: "0x0", // No ETH being sent
        data: isXpClaim
          ? "0x4e71d92d" // Mock function signature for claimXp()
          : "0x3d7403a3", // Mock function signature for progressHunt()
      }

      // Send the transaction
      await sendTransaction(txParams)

      // For demo purposes, we'll just continue with the animation
      // In a real app, you would wait for the transaction to be mined
    } catch (err: any) {
      console.error("Transaction error:", err)
      setError(err.message || "Failed to process transaction. Please try again.")
      setStage("error")
    }
  }

  // Determine if this is the final claim transaction
  const isFinalClaim = isXpClaim || step > 5

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-purple-500/30 text-gray-900 dark:text-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{isFinalClaim ? "Claim XP Reward" : `Confirm Step ${step}`}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isFinalClaim
              ? "Sign this transaction to claim your XP reward on Monad testnet."
              : "Sign this transaction to record your progress on the Monad blockchain."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <AnimatePresence mode="wait">
            {stage === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Transaction Type:</span>
                    <span className="font-mono">{isFinalClaim ? "claimXpReward()" : "progressHunt()"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Network:</span>
                    <span className="font-mono">Monad Testnet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Gas Fee:</span>
                    <span className="font-mono">~0.0001 ETH</span>
                  </div>
                  {isFinalClaim ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Action:</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono flex items-center">
                        <Zap className="h-4 w-4 mr-1 text-yellow-500 dark:text-yellow-400" />
                        Claim XP Reward
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                      <span className="font-mono">
                        Step {step} <ArrowRight className="inline h-3 w-3 mx-1" /> {step + 1}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-3 rounded-lg text-sm">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-blue-700 dark:text-blue-300">
                    This transaction will be recorded on the Monad blockchain. Make sure you're connected to the correct
                    network.
                  </span>
                </div>
              </motion.div>
            )}

            {(stage === "signing" || stage === "confirming") && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-4"
              >
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="h-12 w-12 text-purple-600 dark:text-purple-500 animate-spin mb-4" />
                  <h3 className="text-lg font-medium mb-1">
                    {stage === "signing" ? "Signing Transaction" : "Confirming on Monad"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {stage === "signing"
                      ? "Please wait while your wallet signs the transaction..."
                      : "Waiting for confirmation on the Monad blockchain..."}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-800" />
                </div>
              </motion.div>
            )}

            {stage === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">Transaction Confirmed!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {isFinalClaim
                    ? "Your XP reward has been processed successfully."
                    : `You've successfully progressed to step ${step + 1}.`}
                </p>
              </motion.div>
            )}

            {stage === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">Transaction Failed</h3>

                {error && (
                  <Alert className="bg-red-100/50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30 mt-4">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-700 dark:text-red-300 ml-2 text-sm">{error}</AlertDescription>
                  </Alert>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {stage === "initial" && (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSign}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1 text-white"
              >
                Sign Transaction
              </Button>
            </>
          )}

          {(stage === "signing" || stage === "confirming") && (
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              disabled
            >
              Processing...
            </Button>
          )}

          {stage === "error" && (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setStage("initial")
                  setError(null)
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1 text-white"
              >
                Try Again
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
