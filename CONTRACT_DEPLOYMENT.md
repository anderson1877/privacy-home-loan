# Smart Contract Deployment Guide

## 🚀 Deploy PrivacyHomeLoan Contract

### Prerequisites
- Node.js 18+
- Hardhat or Foundry
- Sepolia ETH for gas fees
- Private key with Sepolia ETH

### Step 1: Install Dependencies
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @fhevm/solidity
```

### Step 2: Deploy Contract
```bash
# Using Hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

# Or using Foundry
forge build
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY src/PrivacyHomeLoan.sol:PrivacyHomeLoan
```

### Step 3: Update Contract Address
After deployment, update the contract address in:
- `src/config/env.ts` - Update `privacyHomeLoanContract` field
- `src/hooks/useContract.ts` - Verify ABI matches deployed contract

### Step 4: Verify Contract
```bash
# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

### Step 5: Test Contract Interaction
1. Connect wallet to Sepolia testnet
2. Submit a test loan application
3. Check transaction on Etherscan
4. Verify encrypted data is stored on-chain

## 🔐 FHE Configuration

### Environment Variables
```bash
# Add to .env.local
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
NEXT_PUBLIC_FHE_NETWORK_URL=https://api.zama.ai/fhevm
NEXT_PUBLIC_FHE_CHAIN_ID=0x1a1
```

### Contract Address
Update the deployed contract address in `src/config/env.ts`:
```typescript
privacyHomeLoanContract: "0xYOUR_DEPLOYED_CONTRACT_ADDRESS"
```

## 🧪 Testing

### Local Testing
```bash
npm run dev
# Navigate to http://localhost:5173
# Connect wallet to Sepolia
# Submit test application
```

### Contract Testing
```bash
# Run contract tests
npx hardhat test
```

## 📊 Monitoring

### Transaction Monitoring
- Check transactions on [Sepolia Etherscan](https://sepolia.etherscan.io/)
- Monitor contract events and logs
- Verify encrypted data storage

### Error Handling
- Check browser console for encryption logs
- Verify wallet connection status
- Ensure sufficient gas fees

## 🔧 Troubleshooting

### Common Issues
1. **Contract not deployed**: Verify deployment script and network configuration
2. **Transaction fails**: Check gas fees and wallet balance
3. **Encryption errors**: Verify FHE configuration and data format
4. **Wallet connection**: Ensure wallet is connected to Sepolia testnet

### Support
- Check contract logs on Etherscan
- Review browser console for detailed error messages
- Verify all environment variables are set correctly
