import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Bell, 
  Wallet, 
  Key,
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  viewMode: "borrower" | "lender";
}

export const SettingsPage = ({ viewMode }: SettingsPageProps) => {
  const { toast } = useToast();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com", 
    phone: "+1 (555) 123-4567",
    bio: viewMode === "lender" ? "Experienced private lender focusing on residential mortgages" : "First-time homebuyer looking for privacy-focused lending solutions"
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    dataEncryption: true,
    anonymousMode: false,
    shareAnalytics: true,
    publicProfile: viewMode === "lender",
    twoFactorAuth: true
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated", 
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, privacy, and notification preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Wallet
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select defaultValue={viewMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borrower">Borrower</SelectItem>
                    <SelectItem value="lender">Lender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveProfile} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">End-to-End Encryption</div>
                  <div className="text-sm text-muted-foreground">Encrypt all your data with zero-knowledge architecture</div>
                </div>
                <Switch 
                  checked={privacySettings.dataEncryption}
                  onCheckedChange={(checked) => setPrivacySettings({...privacySettings, dataEncryption: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Anonymous Mode</div>
                  <div className="text-sm text-muted-foreground">Hide your identity from other users</div>
                </div>
                <Switch 
                  checked={privacySettings.anonymousMode}
                  onCheckedChange={(checked) => setPrivacySettings({...privacySettings, anonymousMode: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Share Analytics</div>
                  <div className="text-sm text-muted-foreground">Help improve the platform with anonymous usage data</div>
                </div>
                <Switch 
                  checked={privacySettings.shareAnalytics}
                  onCheckedChange={(checked) => setPrivacySettings({...privacySettings, shareAnalytics: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Public Profile</div>
                  <div className="text-sm text-muted-foreground">Make your profile visible to other users</div>
                </div>
                <Switch 
                  checked={privacySettings.publicProfile}
                  onCheckedChange={(checked) => setPrivacySettings({...privacySettings, publicProfile: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <Badge className="bg-success/10 text-success">Enabled</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                </div>
                <Switch 
                  checked={privacySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setPrivacySettings({...privacySettings, twoFactorAuth: checked})}
                />
              </div>
              
              <Button onClick={handleSavePrivacy} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive browser notifications</div>
                </div>
                <Switch 
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Application Updates</div>
                  <div className="text-sm text-muted-foreground">Get notified about application status changes</div>
                </div>
                <Switch 
                  checked={notificationSettings.applicationUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, applicationUpdates: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-muted-foreground">Important security and privacy notifications</div>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">Receive product updates and promotions</div>
                </div>
                <Switch 
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                />
              </div>
              
              <Button onClick={handleSaveNotifications} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Settings */}
        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  <div className="font-medium">Connected Wallet</div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  0x1234...5678
                </div>
                <Badge className="bg-success/10 text-success">Connected</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Private Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      type={showPrivateKey ? "text" : "password"}
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                    />
                    <Button 
                      variant="outline"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-medium text-destructive">Security Warning</div>
                      <div className="text-sm text-muted-foreground">
                        Never share your private key with anyone. Store it securely and keep it private.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Export Private Key
                  </Button>
                  <Button variant="outline">
                    Disconnect Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};