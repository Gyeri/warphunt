interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (request: { method: string; params?: any[] }) => Promise<any>
    on: (eventName: string, callback: (...args: any[]) => void) => void
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void
    // Add other properties that might be used, but don't include any that would be assigned to
  }
}
