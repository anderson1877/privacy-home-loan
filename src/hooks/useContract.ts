import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '../config/env';

// Contract ABI - Generated from the compiled PrivacyHomeLoan.sol contract
const PRIVACY_HOME_LOAN_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_propertyAddress", "type": "string"},
      {"internalType": "bytes", "name": "_loanAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "_propertyValue", "type": "bytes"},
      {"internalType": "bytes", "name": "_income", "type": "bytes"},
      {"internalType": "bytes", "name": "_creditScore", "type": "bytes"},
      {"internalType": "bytes", "name": "_downPayment", "type": "bytes"},
      {"internalType": "bytes", "name": "_loanTerm", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createLoanApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "applicationId", "type": "uint256"}],
    "name": "getLoanApplicationInfo",
    "outputs": [
      {"internalType": "string", "name": "propertyAddress", "type": "string"},
      {"internalType": "uint8", "name": "loanAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "propertyValue", "type": "uint8"},
      {"internalType": "uint8", "name": "income", "type": "uint8"},
      {"internalType": "uint8", "name": "creditScore", "type": "uint8"},
      {"internalType": "uint8", "name": "downPayment", "type": "uint8"},
      {"internalType": "uint8", "name": "loanTerm", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isApproved", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "borrower", "type": "address"},
      {"internalType": "address", "name": "lender", "type": "address"},
      {"internalType": "uint256", "name": "applicationDate", "type": "uint256"},
      {"internalType": "uint256", "name": "approvalDate", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"internalType": "address", "name": "lender", "type": "address"}
    ],
    "name": "approveLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const usePrivacyHomeLoan = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createLoanApplication = async (
    propertyAddress: string,
    loanAmount: string,
    propertyValue: string,
    income: string,
    creditScore: string,
    downPayment: string,
    loanTerm: string
  ) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (!address) {
      throw new Error('No wallet address found');
    }

    try {
      // In a production environment, this would use FHE encryption
      // For demo purposes, we'll simulate the encryption process
      console.log('🔐 Encrypting sensitive data with FHE...');
      console.log('📊 Original data:', { loanAmount, propertyValue, income, creditScore, downPayment, loanTerm });
      
      // Simulate FHE encryption of sensitive financial data
      const encryptedLoanAmount = await encryptSensitiveData(loanAmount);
      const encryptedPropertyValue = await encryptSensitiveData(propertyValue);
      const encryptedIncome = await encryptSensitiveData(income);
      const encryptedCreditScore = await encryptSensitiveData(creditScore);
      const encryptedDownPayment = await encryptSensitiveData(downPayment);
      const encryptedLoanTerm = await encryptSensitiveData(loanTerm);
      
      // Generate zero-knowledge proof for encrypted data
      const inputProof = await generateZKProof({
        loanAmount: encryptedLoanAmount,
        propertyValue: encryptedPropertyValue,
        income: encryptedIncome,
        creditScore: encryptedCreditScore,
        downPayment: encryptedDownPayment,
        loanTerm: encryptedLoanTerm
      });

      console.log('🚀 Submitting encrypted application to blockchain...');
      console.log('📍 Contract Address:', config.privacyHomeLoanContract);
      console.log('👤 User Address:', address);

      // Call the smart contract with encrypted data
      const result = await writeContract({
        address: config.privacyHomeLoanContract as `0x${string}`,
        abi: PRIVACY_HOME_LOAN_ABI,
        functionName: 'createLoanApplication',
        args: [
          propertyAddress,
          encryptedLoanAmount,
          encryptedPropertyValue,
          encryptedIncome,
          encryptedCreditScore,
          encryptedDownPayment,
          encryptedLoanTerm,
          inputProof
        ],
      });

      console.log('✅ Transaction submitted:', result);
      console.log('⏳ Waiting for blockchain confirmation...');
      
      return result;
    } catch (err) {
      console.error('❌ Error creating encrypted loan application:', err);
      throw err;
    }
  };

  // Simulate FHE encryption (in production, this would use actual FHE libraries)
  const encryptSensitiveData = async (data: string): Promise<Uint8Array> => {
    // This is a placeholder for actual FHE encryption
    // In production, you would use libraries like @fhevm/solidity or similar
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    
    // Simulate encryption by creating a larger buffer with some transformation
    const encrypted = new Uint8Array(32);
    for (let i = 0; i < Math.min(dataBytes.length, 32); i++) {
      encrypted[i] = dataBytes[i] ^ 0xAA; // Simple XOR for demo
    }
    
    return encrypted;
  };

  // Simulate zero-knowledge proof generation
  const generateZKProof = async (encryptedData: any): Promise<Uint8Array> => {
    // This is a placeholder for actual ZK proof generation
    // In production, you would use libraries like snarkjs or similar
    const proof = new Uint8Array(64);
    
    // Fill with some deterministic data based on encrypted inputs
    const hash = await crypto.subtle.digest('SHA-256', 
      new TextEncoder().encode(JSON.stringify(encryptedData))
    );
    
    proof.set(new Uint8Array(hash), 0);
    return proof;
  };

  const approveLoan = async (applicationId: number, lender: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      await writeContract({
        address: config.privacyHomeLoanContract as `0x${string}`,
        abi: PRIVACY_HOME_LOAN_ABI,
        functionName: 'approveLoan',
        args: [BigInt(applicationId), lender as `0x${string}`],
      });
    } catch (err) {
      console.error('Error approving loan:', err);
      throw err;
    }
  };

  return {
    address,
    isConnected,
    createLoanApplication,
    approveLoan,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
};

export const useLoanApplication = (applicationId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: config.privacyHomeLoanContract as `0x${string}`,
    abi: PRIVACY_HOME_LOAN_ABI,
    functionName: 'getLoanApplicationInfo',
    args: [BigInt(applicationId)],
  });

  return {
    application: data,
    isLoading,
    error,
  };
};
