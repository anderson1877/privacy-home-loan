import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PrivacyOverlay } from "./privacy-overlay";
import { Home, DollarSign, Calendar, TrendingUp } from "lucide-react";

interface MortgageCardProps {
  id: string;
  amount: number;
  property: string;
  riskScore: number;
  status: "pending" | "approved" | "under-review";
  applicationDate: string;
  isLenderView?: boolean;
}

export const MortgageCard = ({ 
  id, 
  amount, 
  property, 
  riskScore, 
  status, 
  applicationDate,
  isLenderView = false 
}: MortgageCardProps) => {
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
    <Card className="shadow-financial hover:shadow-elevated transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Loan #{id}
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              Loan Amount
            </div>
            {isLenderView ? (
              <PrivacyOverlay>
                <p className="text-lg font-semibold">
                  ${amount.toLocaleString()}
                </p>
              </PrivacyOverlay>
            ) : (
              <p className="text-lg font-semibold">
                ${amount.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              Risk Score
            </div>
            <p className={`text-lg font-semibold ${getRiskColor(riskScore)}`}>
              {riskScore}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            Property
          </div>
          {isLenderView ? (
            <PrivacyOverlay>
              <p className="font-medium">{property}</p>
            </PrivacyOverlay>
          ) : (
            <p className="font-medium">{property}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {applicationDate}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-gradient-primary hover:text-primary-foreground transition-smooth"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};