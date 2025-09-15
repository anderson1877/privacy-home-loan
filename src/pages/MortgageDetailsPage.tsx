import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyOverlay } from "@/components/privacy-overlay";
import { 
  ArrowLeft, 
  Home, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  User,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Download
} from "lucide-react";

interface MortgageDetailsPageProps {
  applicationId: string;
  viewMode: "borrower" | "lender";
  onBack: () => void;
}

export const MortgageDetailsPage = ({ applicationId, viewMode, onBack }: MortgageDetailsPageProps) => {
  // Mock data - in real app this would come from API based on applicationId
  const applicationData = {
    id: applicationId,
    amount: 450000,
    property: "123 Oak Street, San Francisco, CA",
    riskScore: 782,
    status: "approved" as const,
    applicationDate: "2024-01-15",
    approvalDate: "2024-01-22",
    interestRate: 6.25,
    loanTerm: 30,
    monthlyPayment: 2774,
    downPayment: 90000,
    propertyValue: 540000,
    
    // Personal info (only shown to borrower or if revealed)
    borrower: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      income: 120000,
      employment: "Software Engineer at TechCorp"
    },
    
    // Timeline
    timeline: [
      { date: "2024-01-15", status: "Application Submitted", completed: true },
      { date: "2024-01-16", status: "Initial Review", completed: true },
      { date: "2024-01-18", status: "Credit Check", completed: true },
      { date: "2024-01-20", status: "Underwriting", completed: true },
      { date: "2024-01-22", status: "Approved", completed: true },
      { date: "2024-02-05", status: "Closing Scheduled", completed: false }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success text-success-foreground";
      case "pending": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-secondary";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {viewMode === "borrower" ? "Applications" : "Lending Pool"}
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Loan #{applicationData.id}</h1>
          <p className="text-muted-foreground">
            {viewMode === "borrower" ? "Your mortgage application details" : "Mortgage investment opportunity"}
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-semibold">Application Status</div>
                <div className="text-muted-foreground">Last updated on {applicationData.approvalDate}</div>
              </div>
            </div>
            <Badge className={getStatusColor(applicationData.status)}>
              {applicationData.status.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Loan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                    <div className="text-lg font-semibold">${applicationData.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Interest Rate</div>
                    <div className="text-lg font-semibold">{applicationData.interestRate}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Loan Term</div>
                    <div className="text-lg font-semibold">{applicationData.loanTerm} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-lg font-semibold">${applicationData.monthlyPayment.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Down Payment</div>
                    <div className="text-lg font-semibold">${applicationData.downPayment.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                    <div className={`text-lg font-semibold ${getRiskColor(applicationData.riskScore)}`}>
                      {applicationData.riskScore}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Property Address</div>
                  {viewMode === "lender" ? (
                    <PrivacyOverlay>
                      <div className="text-lg font-semibold">{applicationData.property}</div>
                    </PrivacyOverlay>
                  ) : (
                    <div className="text-lg font-semibold">{applicationData.property}</div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Property Value</div>
                    <div className="text-lg font-semibold">${applicationData.propertyValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">LTV Ratio</div>
                    <div className="text-lg font-semibold">
                      {Math.round((applicationData.amount / applicationData.propertyValue) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Loan-to-Value Progress</div>
                  <Progress value={(applicationData.amount / applicationData.propertyValue) * 100} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Borrower Information (Privacy Protected for Lenders) */}
          {viewMode === "borrower" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Borrower Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Full Name</div>
                    <div className="font-semibold">{applicationData.borrower.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-semibold">{applicationData.borrower.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-semibold">{applicationData.borrower.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Annual Income</div>
                    <div className="font-semibold">${applicationData.borrower.income.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="font-semibold">${applicationData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-semibold">{applicationData.interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Term</span>
                  <span className="font-semibold">{applicationData.loanTerm} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment</span>
                  <span className="font-semibold">${applicationData.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-semibold">
                    ${((applicationData.monthlyPayment * applicationData.loanTerm * 12) - applicationData.amount).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Credit Risk</span>
                  <Badge className="bg-success/10 text-success">Low</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Income Stability</span>
                  <Badge className="bg-success/10 text-success">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Property Risk</span>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Risk</span>
                  <Badge className="bg-success/10 text-success">Low</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationData.timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.status}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Application Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Loan Application Form",
                  "Credit Report",
                  "Income Verification",
                  "Property Appraisal",
                  "Insurance Documents"
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{doc}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};