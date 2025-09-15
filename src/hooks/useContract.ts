import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '../config/env';

// Contract ABI - This would be generated from the compiled contract
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

    // In a real implementation, these values would be encrypted using FHE
    // For now, we'll use placeholder encrypted data
    const encryptedLoanAmount = new Uint8Array(32); // Placeholder
    const encryptedPropertyValue = new Uint8Array(32); // Placeholder
    const encryptedIncome = new Uint8Array(32); // Placeholder
    const encryptedCreditScore = new Uint8Array(32); // Placeholder
    const encryptedDownPayment = new Uint8Array(32); // Placeholder
    const encryptedLoanTerm = new Uint8Array(32); // Placeholder
    const inputProof = new Uint8Array(64); // Placeholder proof

    try {
      await writeContract({
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
    } catch (err) {
      console.error('Error creating loan application:', err);
      throw err;
    }
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
