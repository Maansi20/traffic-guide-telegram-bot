
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Users, MessageSquare, AlertTriangle, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminPanel = () => {
  const [botToken, setBotToken] = useState('');
  const [firebaseConfig, setFirebaseConfig] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Bot configuration has been updated successfully!",
    });
  };

  const stats = [
    { label: 'Active Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Messages Today', value: '5,678', icon: MessageSquare, color: 'text-green-600' },
    { label: 'Traffic Reports', value: '89', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Routes Planned', value: '456', icon: BarChart3, color: 'text-purple-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="config" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Bot Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botToken">Telegram Bot Token</Label>
                  <Input
                    id="botToken"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="Enter your Telegram bot token"
                    type="password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="botEnabled"
                    checked={isEnabled}
                    onCheckedChange={setIsEnabled}
                  />
                  <Label htmlFor="botEnabled">Bot Enabled</Label>
                </div>
                <Button onClick={handleSaveConfig} className="w-full">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Firebase Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firebaseConfig">Firebase Configuration</Label>
                  <Textarea
                    id="firebaseConfig"
                    value={firebaseConfig}
                    onChange={(e) => setFirebaseConfig(e.target.value)}
                    placeholder="Paste your Firebase config JSON here"
                    rows={6}
                  />
                </div>
                <Button onClick={handleSaveConfig} className="w-full">
                  Connect Firebase
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Google Maps API</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Waze API</span>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Local Traffic Dept</span>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'John Doe', chatId: '123456789', location: 'San Francisco', active: true },
                  { id: 2, name: 'Jane Smith', chatId: '987654321', location: 'Los Angeles', active: true },
                  { id: 3, name: 'Bob Johnson', chatId: '456789123', location: 'Seattle', active: false },
                ].map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Chat ID: {user.chatId}</p>
                      <p className="text-sm text-muted-foreground">Location: {user.location}</p>
                    </div>
                    <Badge variant={user.active ? 'default' : 'secondary'}>
                      {user.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, type: 'Accident', location: 'Highway 101', time: '2 hours ago', status: 'Active' },
                  { id: 2, type: 'Construction', location: 'Main Street', time: '5 hours ago', status: 'Ongoing' },
                  { id: 3, type: 'Heavy Traffic', location: 'Downtown', time: '1 hour ago', status: 'Resolved' },
                ].map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{report.type}</p>
                      <p className="text-sm text-muted-foreground">{report.location}</p>
                      <p className="text-sm text-muted-foreground">{report.time}</p>
                    </div>
                    <Badge variant={report.status === 'Resolved' ? 'secondary' : 'destructive'}>
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bot Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Most Used Commands</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>/traffic</span>
                      <span className="text-muted-foreground">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>/route</span>
                      <span className="text-muted-foreground">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>/notifications</span>
                      <span className="text-muted-foreground">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>/location</span>
                      <span className="text-muted-foreground">10%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Peak Usage Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>7-9 AM</span>
                      <span className="text-muted-foreground">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5-7 PM</span>
                      <span className="text-muted-foreground">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>12-1 PM</span>
                      <span className="text-muted-foreground">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <span className="text-muted-foreground">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
