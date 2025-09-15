// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PrivacyHomeLoan is SepoliaConfig {
    using FHE for *;
    
    struct LoanApplication {
        euint32 applicationId;
        euint32 loanAmount;
        euint32 propertyValue;
        euint32 income;
        euint32 creditScore;
        euint32 downPayment;
        euint32 loanTerm;
        bool isActive;
        bool isApproved;
        bool isVerified;
        string propertyAddress;
        address borrower;
        address lender;
        uint256 applicationDate;
        uint256 approvalDate;
    }
    
    struct LoanPayment {
        euint32 paymentId;
        euint32 amount;
        euint32 principal;
        euint32 interest;
        bool isPaid;
        address payer;
        uint256 dueDate;
        uint256 paymentDate;
    }
    
    struct RiskAssessment {
        euint32 riskScore;
        euint32 ltvRatio; // Loan-to-Value ratio
        euint32 dtiRatio; // Debt-to-Income ratio
        bool isHighRisk;
        address assessor;
        uint256 assessmentDate;
    }
    
    mapping(uint256 => LoanApplication) public loanApplications;
    mapping(uint256 => LoanPayment) public loanPayments;
    mapping(uint256 => RiskAssessment) public riskAssessments;
    mapping(address => euint32) public borrowerReputation;
    mapping(address => euint32) public lenderReputation;
    
    uint256 public applicationCounter;
    uint256 public paymentCounter;
    uint256 public assessmentCounter;
    
    address public owner;
    address public verifier;
    address public riskAssessor;
    
    event LoanApplicationCreated(uint256 indexed applicationId, address indexed borrower, string propertyAddress);
    event LoanApproved(uint256 indexed applicationId, address indexed lender, uint32 loanAmount);
    event PaymentMade(uint256 indexed paymentId, uint256 indexed applicationId, address indexed payer, uint32 amount);
    event RiskAssessmentUpdated(uint256 indexed applicationId, uint32 riskScore, bool isHighRisk);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _riskAssessor) {
        owner = msg.sender;
        verifier = _verifier;
        riskAssessor = _riskAssessor;
    }
    
    function createLoanApplication(
        string memory _propertyAddress,
        externalEuint32 _loanAmount,
        externalEuint32 _propertyValue,
        externalEuint32 _income,
        externalEuint32 _creditScore,
        externalEuint32 _downPayment,
        externalEuint32 _loanTerm,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_propertyAddress).length > 0, "Property address cannot be empty");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalLoanAmount = FHE.fromExternal(_loanAmount, inputProof);
        euint32 internalPropertyValue = FHE.fromExternal(_propertyValue, inputProof);
        euint32 internalIncome = FHE.fromExternal(_income, inputProof);
        euint32 internalCreditScore = FHE.fromExternal(_creditScore, inputProof);
        euint32 internalDownPayment = FHE.fromExternal(_downPayment, inputProof);
        euint32 internalLoanTerm = FHE.fromExternal(_loanTerm, inputProof);
        
        loanApplications[applicationId] = LoanApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            loanAmount: internalLoanAmount,
            propertyValue: internalPropertyValue,
            income: internalIncome,
            creditScore: internalCreditScore,
            downPayment: internalDownPayment,
            loanTerm: internalLoanTerm,
            isActive: true,
            isApproved: false,
            isVerified: false,
            propertyAddress: _propertyAddress,
            borrower: msg.sender,
            lender: address(0),
            applicationDate: block.timestamp,
            approvalDate: 0
        });
        
        emit LoanApplicationCreated(applicationId, msg.sender, _propertyAddress);
        return applicationId;
    }
    
    function assessRisk(
        uint256 applicationId,
        euint32 riskScore,
        euint32 ltvRatio,
        euint32 dtiRatio
    ) public returns (uint256) {
        require(msg.sender == riskAssessor, "Only risk assessor can assess risk");
        require(loanApplications[applicationId].borrower != address(0), "Application does not exist");
        require(loanApplications[applicationId].isActive, "Application must be active");
        
        uint256 assessmentId = assessmentCounter++;
        
        // Calculate if high risk based on encrypted values
        ebool isHighRisk = FHE.or(
            FHE.gt(ltvRatio, FHE.asEuint32(80)), // LTV > 80%
            FHE.gt(dtiRatio, FHE.asEuint32(43))  // DTI > 43%
        );
        
        riskAssessments[assessmentId] = RiskAssessment({
            riskScore: riskScore,
            ltvRatio: ltvRatio,
            dtiRatio: dtiRatio,
            isHighRisk: false, // Will be decrypted off-chain
            assessor: msg.sender,
            assessmentDate: block.timestamp
        });
        
        emit RiskAssessmentUpdated(applicationId, 0, false); // Values will be decrypted off-chain
        return assessmentId;
    }
    
    function approveLoan(
        uint256 applicationId,
        address lender
    ) public {
        require(msg.sender == verifier, "Only verifier can approve loans");
        require(loanApplications[applicationId].borrower != address(0), "Application does not exist");
        require(loanApplications[applicationId].isActive, "Application must be active");
        require(!loanApplications[applicationId].isApproved, "Loan already approved");
        
        loanApplications[applicationId].isApproved = true;
        loanApplications[applicationId].isVerified = true;
        loanApplications[applicationId].lender = lender;
        loanApplications[applicationId].approvalDate = block.timestamp;
        
        emit LoanApproved(applicationId, lender, 0); // Amount will be decrypted off-chain
    }
    
    function makePayment(
        uint256 applicationId,
        externalEuint32 amount,
        externalEuint32 principal,
        externalEuint32 interest,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(loanApplications[applicationId].borrower != address(0), "Application does not exist");
        require(loanApplications[applicationId].isApproved, "Loan must be approved");
        require(loanApplications[applicationId].isActive, "Loan must be active");
        require(msg.sender == loanApplications[applicationId].borrower, "Only borrower can make payments");
        
        uint256 paymentId = paymentCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalPrincipal = FHE.fromExternal(principal, inputProof);
        euint32 internalInterest = FHE.fromExternal(interest, inputProof);
        
        loanPayments[paymentId] = LoanPayment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            principal: internalPrincipal,
            interest: internalInterest,
            isPaid: true,
            payer: msg.sender,
            dueDate: block.timestamp + 30 days, // Simplified: 30 days from now
            paymentDate: block.timestamp
        });
        
        emit PaymentMade(paymentId, applicationId, msg.sender, 0); // Amount will be decrypted off-chain
        return paymentId;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is borrower or lender based on context
        if (loanApplications[applicationCounter - 1].borrower == user) {
            borrowerReputation[user] = reputation;
        } else {
            lenderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getLoanApplicationInfo(uint256 applicationId) public view returns (
        string memory propertyAddress,
        uint8 loanAmount,
        uint8 propertyValue,
        uint8 income,
        uint8 creditScore,
        uint8 downPayment,
        uint8 loanTerm,
        bool isActive,
        bool isApproved,
        bool isVerified,
        address borrower,
        address lender,
        uint256 applicationDate,
        uint256 approvalDate
    ) {
        LoanApplication storage application = loanApplications[applicationId];
        return (
            application.propertyAddress,
            0, // FHE.decrypt(application.loanAmount) - will be decrypted off-chain
            0, // FHE.decrypt(application.propertyValue) - will be decrypted off-chain
            0, // FHE.decrypt(application.income) - will be decrypted off-chain
            0, // FHE.decrypt(application.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(application.downPayment) - will be decrypted off-chain
            0, // FHE.decrypt(application.loanTerm) - will be decrypted off-chain
            application.isActive,
            application.isApproved,
            application.isVerified,
            application.borrower,
            application.lender,
            application.applicationDate,
            application.approvalDate
        );
    }
    
    function getPaymentInfo(uint256 paymentId) public view returns (
        uint8 amount,
        uint8 principal,
        uint8 interest,
        bool isPaid,
        address payer,
        uint256 dueDate,
        uint256 paymentDate
    ) {
        LoanPayment storage payment = loanPayments[paymentId];
        return (
            0, // FHE.decrypt(payment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(payment.principal) - will be decrypted off-chain
            0, // FHE.decrypt(payment.interest) - will be decrypted off-chain
            payment.isPaid,
            payment.payer,
            payment.dueDate,
            payment.paymentDate
        );
    }
    
    function getRiskAssessmentInfo(uint256 assessmentId) public view returns (
        uint8 riskScore,
        uint8 ltvRatio,
        uint8 dtiRatio,
        bool isHighRisk,
        address assessor,
        uint256 assessmentDate
    ) {
        RiskAssessment storage assessment = riskAssessments[assessmentId];
        return (
            0, // FHE.decrypt(assessment.riskScore) - will be decrypted off-chain
            0, // FHE.decrypt(assessment.ltvRatio) - will be decrypted off-chain
            0, // FHE.decrypt(assessment.dtiRatio) - will be decrypted off-chain
            assessment.isHighRisk,
            assessment.assessor,
            assessment.assessmentDate
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerReputation[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function closeLoan(uint256 applicationId) public {
        require(loanApplications[applicationId].borrower == msg.sender || 
                loanApplications[applicationId].lender == msg.sender, 
                "Only borrower or lender can close loan");
        require(loanApplications[applicationId].isApproved, "Loan must be approved");
        require(loanApplications[applicationId].isActive, "Loan must be active");
        
        loanApplications[applicationId].isActive = false;
    }
}
