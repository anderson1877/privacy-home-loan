import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { ApplicationsPage } from "./ApplicationsPage";
import { AnalyticsPage } from "./AnalyticsPage";  
import { SettingsPage } from "./SettingsPage";
import { ApplyMortgagePage } from "./ApplyMortgagePage";
import { MortgageDetailsPage } from "./MortgageDetailsPage";
import { MortgageCard } from "@/components/mortgage-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroBackground from "@/assets/hero-bg.jpg";
import { 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Lock,
  Eye,
  Plus
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState<"borrower" | "lender">("borrower");
  const [currentView, setCurrentView] = useState<"main" | "apply" | "details">("main");
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>("");

  const handleApplyMortgage = () => {
    setCurrentView("apply");
  };

  const handleViewDetails = (id: string) => {
    setSelectedApplicationId(id);
    setCurrentView("details");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setSelectedApplicationId("");
  };

  const handleHeroApplyClick = () => {
    setActiveTab("applications");
    setCurrentView("apply");
  };

  const handleHeroLenderClick = () => {
    setViewMode("lender");
    setActiveTab("applications");
  };

  const mockApplications = [
    {
      id: "ML001",
      amount: 450000,
      property: "123 Oak Street, San Francisco, CA",
      riskScore: 782,
      status: "approved" as const,
      applicationDate: "2024-01-15"
    },
    {
      id: "ML002", 
      amount: 320000,
      property: "456 Pine Avenue, Austin, TX",
      riskScore: 695,
      status: "under-review" as const,
      applicationDate: "2024-01-12"
    },
    {
      id: "ML003",
      amount: 280000,
      property: "789 Cedar Lane, Portland, OR", 
      riskScore: 721,
      status: "pending" as const,
      applicationDate: "2024-01-10"
    }
  ];

  const stats = [
    {
      title: "Total Applications",
      value: "24",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Approved Loans",
      value: "$2.4M",
      change: "+8%", 
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Avg Risk Score",
      value: "742",
      change: "+3%",
      icon: Shield,
      color: "text-secondary"
    },
    {
      title: "Privacy Score",
      value: "98%",
      change: "Excellent",
      icon: Lock,
      color: "text-secondary"
    }
  ];

  // Show mortgage application form
  if (currentView === "apply") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="container mx-auto px-6 py-12">
          <ApplyMortgagePage onBack={handleBackToMain} />
        </div>
      </div>
    );
  }

  // Show mortgage details
  if (currentView === "details" && selectedApplicationId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="container mx-auto px-6 py-12">
          <MortgageDetailsPage 
            applicationId={selectedApplicationId}
            viewMode={viewMode}
            onBack={handleBackToMain}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Show different content based on active tab */}
      {activeTab === "dashboard" && (
        <>
          {/* Hero Section */}
          <div 
            className="relative bg-gradient-hero py-20 overflow-hidden"
            style={{ 
              backgroundImage: `linear-gradient(135deg, rgba(33, 82, 161, 0.9), rgba(6, 126, 135, 0.9)), url(${heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="container mx-auto px-6 relative">
              <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-primary-foreground leading-tight">
                  Own Your Home,<br />Keep Your Privacy
                </h1>
                <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                  Revolutionary RWA mortgage lending with encrypted applications and privacy-preserving risk assessment.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg"
                    onClick={handleHeroApplyClick}
                    className="bg-card text-primary hover:bg-card/90 shadow-elevated transition-bounce"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Apply for Mortgage
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleHeroLenderClick}
                    className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View as Lender
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-12">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                {viewMode === "borrower" ? "My Applications" : "Lending Pool"}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "borrower" ? "default" : "outline"}
                  onClick={() => setViewMode("borrower")}
                  className={viewMode === "borrower" ? "bg-gradient-primary" : ""}
                >
                  Borrower View
                </Button>
                <Button
                  variant={viewMode === "lender" ? "default" : "outline"}
                  onClick={() => setViewMode("lender")}
                  className={viewMode === "lender" ? "bg-gradient-secondary" : ""}
                >
                  Lender View
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="shadow-financial hover:shadow-privacy transition-smooth">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-card-foreground">
                          {stat.value}
                        </span>
                        <Badge 
                          variant="secondary"
                          className="bg-success/10 text-success border-success/20"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockApplications.map((application) => (
                <div key={application.id} onClick={() => handleViewDetails(application.id)} className="cursor-pointer">
                  <MortgageCard
                    {...application}
                    isLenderView={viewMode === "lender"}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "applications" && (
        <div className="container mx-auto px-6 py-12">
          <ApplicationsPage 
            viewMode={viewMode}
            onApplyMortgage={handleApplyMortgage}
            onViewDetails={handleViewDetails}
          />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="container mx-auto px-6 py-12">
          <AnalyticsPage viewMode={viewMode} />
        </div>
      )}

      {activeTab === "settings" && (
        <div className="container mx-auto px-6 py-12">
          <SettingsPage viewMode={viewMode} />
        </div>
      )}
    </div>
  );
};

export default Index;