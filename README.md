# Privacy Home Loan

A revolutionary mortgage lending platform that leverages Fully Homomorphic Encryption (FHE) to provide privacy-preserving loan applications and risk assessments. Built on blockchain technology with Rainbow wallet integration for secure, transparent, and private financial transactions.

## 🏠 Features

- **FHE-Encrypted Applications**: Submit mortgage applications with fully encrypted personal and financial data
- **Privacy-Preserving Risk Assessment**: Credit scores and financial information remain encrypted during evaluation
- **Blockchain Integration**: Transparent and immutable loan records on Sepolia testnet
- **Rainbow Wallet Support**: Seamless wallet connection with multiple wallet providers
- **Real-time Analytics**: Track application status and loan performance
- **Secure Document Management**: Encrypted document storage and verification

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Wagmi, RainbowKit, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Network**: Sepolia Testnet
- **Wallet**: Rainbow Wallet, WalletConnect

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/anderson1877/privacy-home-loan.git

# Navigate to the project directory
cd privacy-home-loan

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# FHE Configuration
NEXT_PUBLIC_FHE_NETWORK_URL=https://api.zama.ai/fhevm
NEXT_PUBLIC_FHE_CHAIN_ID=0x1a1
```

## 📋 Usage

### For Borrowers

1. **Connect Wallet**: Use Rainbow wallet or any supported Web3 wallet
2. **Apply for Loan**: Fill out the encrypted application form
3. **Submit Application**: Your data is encrypted using FHE before submission
4. **Track Progress**: Monitor your application status in real-time
5. **Receive Approval**: Get notified when your loan is approved

### For Lenders

1. **Connect Wallet**: Access the lender dashboard
2. **Review Applications**: View encrypted loan applications
3. **Risk Assessment**: Perform privacy-preserving risk evaluations
4. **Approve Loans**: Approve or reject applications
5. **Monitor Performance**: Track loan performance and payments

## 🔐 Security Features

- **FHE Encryption**: All sensitive data is encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Proofs**: Verify information without revealing underlying data
- **Decentralized Storage**: Data is stored on blockchain for immutability
- **Private Key Management**: Secure wallet integration with multiple providers

## 🏗️ Smart Contract

The `PrivacyHomeLoan.sol` contract implements:

- Encrypted loan application creation
- Privacy-preserving risk assessment
- Secure loan approval process
- Encrypted payment tracking
- Reputation system for borrowers and lenders

### Contract Functions

- `createLoanApplication()`: Submit encrypted loan applications
- `assessRisk()`: Perform encrypted risk assessments
- `approveLoan()`: Approve or reject loan applications
- `makePayment()`: Process encrypted loan payments
- `updateReputation()`: Update user reputation scores

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📦 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Add all required environment variables
3. **Deploy**: Vercel will automatically deploy on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# The build files will be in the 'dist' directory
```

## 🔧 Configuration

### Wallet Configuration

The app supports multiple wallet providers through RainbowKit:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And more...

### Network Configuration

Currently configured for Sepolia testnet. To change networks, update the configuration in `src/config/wallet.ts`.

## 📚 API Reference

### Hooks

- `usePrivacyHomeLoan()`: Main contract interaction hook
- `useLoanApplication(id)`: Get specific loan application data
- `useContract()`: Generic contract interaction utilities

### Components

- `WalletConnect`: Rainbow wallet connection component
- `ApplyMortgagePage`: Loan application form
- `AnalyticsPage`: Dashboard and analytics
- `MortgageCard`: Individual loan display component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in this repository
- Contact: jordanrobinson11@brightcore.chat
- Documentation: [Link to documentation]

## 🔮 Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] Integration with traditional banking
- [ ] AI-powered risk assessment
- [ ] Cross-border lending support

---

**Built with ❤️ for privacy and financial freedom**
