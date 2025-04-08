
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'general';
  
  // General Settings
  const [libraryName, setLibraryName] = useState('Yakthung Research');
  const [adminEmail, setAdminEmail] = useState('admin@yakthungresearch.com');
  const [loanPeriod, setLoanPeriod] = useState('14');
  const [darkMode, setDarkMode] = useState(false);
  
  // Account Settings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [overdueReminders, setOverdueReminders] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleSaveGeneralSettings = () => {
    toast.success('Settings saved successfully');
  };
  
  const handleUpdateAccount = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Update user in localStorage
    if (user) {
      const updatedUser = {
        ...user,
        name,
        email
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    toast.success('Account updated successfully');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleSaveNotificationPreferences = () => {
    toast.success('Notification preferences saved');
  };
  
  // Temporary toast for settings changes
  const showSettingChangeToast = (setting: string, value: string) => {
    toast.info(`${setting} changed to "${value}". Click "Save Settings" to apply.`, {
      duration: 5000,
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="library-name">Library Name</Label>
                  <Input 
                    id="library-name" 
                    value={libraryName} 
                    onChange={(e) => {
                      setLibraryName(e.target.value);
                      showSettingChangeToast('Library Name', e.target.value);
                    }} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Administrator Email</Label>
                  <Input 
                    id="admin-email" 
                    value={adminEmail} 
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      showSettingChangeToast('Administrator Email', e.target.value);
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loan-period">Default Loan Period (Days)</Label>
                  <Input 
                    id="loan-period" 
                    type="number" 
                    value={loanPeriod}
                    onChange={(e) => {
                      setLoanPeriod(e.target.value);
                      showSettingChangeToast('Default Loan Period', e.target.value + ' days');
                    }} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark theme for the application
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode}
                    onCheckedChange={(checked) => {
                      setDarkMode(checked);
                      showSettingChangeToast('Dark Mode', checked ? 'enabled' : 'disabled');
                    }}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleUpdateAccount}>Update Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="overdue-reminders">Overdue Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Send reminders for overdue books
                    </p>
                  </div>
                  <Switch 
                    id="overdue-reminders" 
                    checked={overdueReminders}
                    onCheckedChange={setOverdueReminders}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system updates
                    </p>
                  </div>
                  <Switch 
                    id="system-updates" 
                    checked={systemUpdates}
                    onCheckedChange={setSystemUpdates}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotificationPreferences}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Yakthung Research</CardTitle>
              <CardDescription>
                System information and version details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Version</div>
                  <div className="text-sm col-span-2">0.2</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                  <div className="text-sm col-span-2">April 8, 2025</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Developed By</div>
                  <div className="text-sm col-span-2">Yakthung Research Team (Ningsang Jabegu)</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">Contact</div>
                  <div className="text-sm col-span-2">support@yakthungresearch.com</div>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  © 2025 Yakthung Research. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
