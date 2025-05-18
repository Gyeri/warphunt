export const hasEthereumProvider = (): boolean => {
  return typeof window !== "undefined" && !!window.ethereum
}

// Get accounts without modifying the provider
export const getAccounts = async (): Promise<string[]> => {
  if (!hasEthereumProvider()) {
    throw new Error("No Ethereum provider found")
  }

  try {
    return await window.ethereum.request({ method: "eth_accounts" })
  } catch (error) {
    console.error("Failed to get accounts:", error)
    return []
  }
}

// Request accounts (triggers wallet popup)
export const requestAccounts = async (): Promise<string[]> => {
  if (!hasEthereumProvider()) {
    throw new Error("No Ethereum provider found")
  }

  try {
    return await window.ethereum.request({ method: "eth_requestAccounts" })
  } catch (error) {
    console.error("Failed to request accounts:", error)
    throw error
  }
}

// Format an Ethereum address for display
export const formatAddress = (address: string | undefined): string => {
  if (!address || typeof address !== "string" || address.length < 10) {
    return "0x0000...0000"
  }

  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// Add event listener for account changes
export const addAccountsChangedListener = (callback: (accounts: string[]) => void): void => {
  if (hasEthereumProvider()) {
    window.ethereum.on("accountsChanged", callback)
  }
}

// Remove event listener for account changes
export const removeAccountsChangedListener = (callback: (accounts: string[]) => void): void => {
  if (hasEthereumProvider()) {
    window.ethereum.removeListener("accountsChanged", callback)
  }
}

// Mock transaction request - in a real app, this would send an actual transaction
export const sendTransaction = async (params: any): Promise<string> => {
  if (!hasEthereumProvider()) {
    throw new Error("No Ethereum provider found")
  }

  try {
    // For demo purposes, we'll just return a mock transaction hash
    // In a real app, you would use:
    // return await window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [params]
    // });

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a mock transaction hash
    return (
      "0x" +
      Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
    )
  } catch (error) {
    console.error("Failed to send transaction:", error)
    throw error
  }
}
