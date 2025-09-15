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
  
  // Contract Addresses (to be deployed)
  privacyHomeLoanContract: "0x0000000000000000000000000000000000000000", // Will be updated after deployment
} as const;
