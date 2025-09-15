// Environment configuration for Privacy Home Loan
export const config = {
  // Chain Configuration
  chainId: 11155111, // Sepolia
  rpcUrl: "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
  
  // Wallet Connect Configuration
  walletConnectProjectId: "2ec9743d0d0cd7fb94dee1a7e6d33475",
  
  // Infura Configuration
  infuraApiKey: "b18fb7e6ca7045ac83c41157ab93f990",
  alternativeRpcUrl: "https://1rpc.io/sepolia",
  
  // FHE Configuration
  fheNetworkUrl: "https://api.zama.ai/fhevm",
  fheChainId: 0x1a1,
  
  // Contract Addresses
  privacyHomeLoanContract: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", // Deployed PrivacyHomeLoan contract on Sepolia
} as const;
