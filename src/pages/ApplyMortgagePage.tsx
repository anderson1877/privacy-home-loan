import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  DollarSign, 
  User, 
  FileText,
  Shield,
  Lock,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePrivacyHomeLoan } from "@/hooks/useContract";

interface ApplyMortgagePageProps {
  onBack: () => void;
}

export const ApplyMortgagePage = ({ onBack }: ApplyMortgagePageProps) => {
  const { toast } = useToast();
  const { createLoanApplication, isPending, isConfirmed, error } = usePrivacyHomeLoan();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dateOfBirth: "",
    
    // Property Information  
    propertyAddress: "",
    propertyType: "",
    propertyValue: "",
    downPayment: "",
    loanAmount: "",
    
    // Financial Information
    annualIncome: "",
    employmentStatus: "", 
    employerName: "",
    monthlyDebt: "",
    creditScore: "",
    
    // Additional Information
    loanPurpose: "",
    additionalNotes: ""
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = async () => {
    try {
      // Validate required fields
      if (!formData.propertyAddress || !formData.loanAmount || !formData.propertyValue || 
          !formData.annualIncome || !formData.creditScore || !formData.downPayment) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before submitting.",
          variant: "destructive",
        });
        return;
      }

      // Submit encrypted data to blockchain
      toast({
        title: "🔐 Encrypting Your Data",
        description: "Your sensitive financial information is being encrypted with FHE before blockchain submission...",
      });

      await createLoanApplication(
        formData.propertyAddress,
        formData.loanAmount,
        formData.propertyValue,
        formData.annualIncome,
        formData.creditScore,
        formData.downPayment,
        formData.loanTerm || "30"
      );

      toast({
        title: "✅ Application Submitted Securely",
        description: "Your mortgage application has been encrypted and submitted to the blockchain. Your data remains private throughout the process.",
      });
      
      onBack();
    } catch (err) {
      console.error('Error submitting application:', err);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input 
                  id="ssn"
                  value={formData.ssn}
                  onChange={(e) => updateFormData("ssn", e.target.value)}
                  placeholder="XXX-XX-XXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Property Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input 
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => updateFormData("propertyAddress", e.target.value)}
                placeholder="Enter the complete property address"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Property Value *</Label>
                <Input 
                  id="propertyValue"
                  value={formData.propertyValue}
                  onChange={(e) => updateFormData("propertyValue", e.target.value)}
                  placeholder="$0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment *</Label>
                <Input 
                  id="downPayment"
                  value={formData.downPayment}
                  onChange={(e) => updateFormData("downPayment", e.target.value)}
                  placeholder="$0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount *</Label>
                <Input 
                  id="loanAmount"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData("loanAmount", e.target.value)}
                  placeholder="$0"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Financial Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income *</Label>
                <Input 
                  id="annualIncome"
                  value={formData.annualIncome}
                  onChange={(e) => updateFormData("annualIncome", e.target.value)}
                  placeholder="$0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData("employmentStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employerName">Employer Name</Label>
              <Input 
                id="employerName"
                value={formData.employerName}
                onChange={(e) => updateFormData("employerName", e.target.value)}
                placeholder="Enter your employer name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                <Input 
                  id="monthlyDebt"
                  value={formData.monthlyDebt}
                  onChange={(e) => updateFormData("monthlyDebt", e.target.value)}
                  placeholder="$0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creditScore">Credit Score (Optional)</Label>
                <Input 
                  id="creditScore"
                  value={formData.creditScore}
                  onChange={(e) => updateFormData("creditScore", e.target.value)}
                  placeholder="Enter if known"
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <Select value={formData.loanPurpose} onValueChange={(value) => updateFormData("loanPurpose", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Home Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="cash-out">Cash-out Refinance</SelectItem>
                  <SelectItem value="investment">Investment Property</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea 
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                placeholder="Any additional information you'd like to share..."
                rows={4}
              />
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-2">
                  <div className="font-medium text-primary">Privacy Protection</div>
                  <div className="text-sm text-muted-foreground">
                    Your application will be encrypted end-to-end. Lenders will only see your risk score and anonymized property information until you choose to reveal more details.
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Lock className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">256-bit AES Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apply for Mortgage</h1>
          <p className="text-muted-foreground">Secure, private, and encrypted mortgage application</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Personal Info</span>
              <span>Property</span>
              <span>Financial</span>
              <span>Review</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepContent()}
          
          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-gradient-primary">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={submitApplication} 
                className="bg-gradient-primary"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};