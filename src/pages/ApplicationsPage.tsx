import { useState } from "react";
import { MortgageCard } from "@/components/mortgage-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

interface ApplicationsPageProps {
  viewMode: "borrower" | "lender";
  onApplyMortgage: () => void;
  onViewDetails: (id: string) => void;
}

export const ApplicationsPage = ({ viewMode, onApplyMortgage, onViewDetails }: ApplicationsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
    },
    {
      id: "ML004",
      amount: 520000,
      property: "321 Maple Drive, Seattle, WA",
      riskScore: 756,
      status: "approved" as const,
      applicationDate: "2024-01-08"
    },
    {
      id: "ML005",
      amount: 390000,
      property: "654 Birch Street, Denver, CO",
      riskScore: 688,
      status: "pending" as const,
      applicationDate: "2024-01-05"
    }
  ];

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    return mockApplications.filter(app => app.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {viewMode === "borrower" ? "My Applications" : "Lending Pool"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {viewMode === "borrower" 
              ? "Track your mortgage applications and their status"
              : "Browse available mortgage opportunities with privacy protection"
            }
          </p>
        </div>
        
        {viewMode === "borrower" && (
          <Button onClick={onApplyMortgage} className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Mortgage
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{mockApplications.length}</p>
              </div>
              <Badge variant="secondary">{mockApplications.length}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{getStatusCount("approved")}</p>
              </div>
              <Badge className="bg-success/10 text-success">{getStatusCount("approved")}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold text-secondary">{getStatusCount("under-review")}</p>
              </div>
              <Badge variant="secondary">{getStatusCount("under-review")}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-muted-foreground">{getStatusCount("pending")}</p>
              </div>
              <Badge variant="outline">{getStatusCount("pending")}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by property or loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApplications.map((application) => (
          <div key={application.id} onClick={() => onViewDetails(application.id)}>
            <MortgageCard
              {...application}
              isLenderView={viewMode === "lender"}
            />
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No applications found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};