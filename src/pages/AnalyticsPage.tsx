import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Users, 
  Home,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

interface AnalyticsPageProps {
  viewMode: "borrower" | "lender";
}

export const AnalyticsPage = ({ viewMode }: AnalyticsPageProps) => {
  const borrowerStats = [
    {
      title: "Application Success Rate",
      value: "85%",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      description: "Your applications approval rate"
    },
    {
      title: "Average Risk Score",
      value: "742",
      change: "+15 pts",
      trend: "up", 
      icon: Shield,
      description: "Credit worthiness assessment"
    },
    {
      title: "Time to Approval",
      value: "7 days",
      change: "-2 days",
      trend: "up",
      icon: Activity,
      description: "Average processing time"
    },
    {
      title: "Total Applied",
      value: "$1.2M",
      change: "+24%",
      trend: "up",
      icon: DollarSign,
      description: "Lifetime application amount"
    }
  ];

  const lenderStats = [
    {
      title: "Portfolio Value",
      value: "$8.4M",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "Total lending portfolio"
    },
    {
      title: "Active Loans",
      value: "42",
      change: "+7",
      trend: "up",
      icon: Home,
      description: "Currently funded loans"
    },
    {
      title: "Average Yield",
      value: "6.8%",
      change: "+0.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Annual return rate"
    },
    {
      title: "Risk Distribution",
      value: "A+ Grade",
      change: "Optimal",
      trend: "up",
      icon: Shield,
      description: "Portfolio risk profile"
    }
  ];

  const currentStats = viewMode === "borrower" ? borrowerStats : lenderStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {viewMode === "borrower" 
            ? "Track your mortgage application performance and credit metrics"
            : "Monitor your lending portfolio performance and risk exposure"
          }
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index} className="shadow-financial hover:shadow-elevated transition-smooth">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </span>
                    <Badge 
                      variant="secondary"
                      className={`${isPositive ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance  
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Risk Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  {viewMode === "borrower" ? "Application Status" : "Loan Distribution"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Approved</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Under Review</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  {viewMode === "borrower" ? "Credit Trend" : "Yield Trend"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Last 30 Days</span>
                    <Badge className="bg-success/10 text-success">+8.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Last 90 Days</span>
                    <Badge className="bg-success/10 text-success">+12.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Last 12 Months</span>
                    <Badge className="bg-success/10 text-success">+24.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">94%</div>
                  <div className="text-sm text-muted-foreground">Efficiency Score</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">7.2%</div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">98%</div>
                  <div className="text-sm text-muted-foreground">Privacy Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Credit Risk</div>
                    <div className="text-sm text-muted-foreground">Low exposure</div>
                  </div>
                  <Badge className="bg-success/10 text-success">Low</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Market Risk</div>
                    <div className="text-sm text-muted-foreground">Moderate exposure</div>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Privacy Risk</div>
                    <div className="text-sm text-muted-foreground">Fully protected</div>
                  </div>
                  <Badge className="bg-success/10 text-success">Minimal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};