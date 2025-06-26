
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, MapPin, Clock, AlertTriangle, Route, Bell, Settings, Database, Users, MessageSquare, BarChart3, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '../types';
import { botService } from '../utils/botService';

export const TrafficBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Traffic Assistant Bot! 🚗\n\nI can help you with:\n• Real-time traffic updates\n• Route planning\n• Traffic notifications\n• Community reports\n\nType /help for commands or ask me anything!',
      isBot: true,
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botToken, setBotToken] = useState('');
  const [firebaseConfig, setFirebaseConfig] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickCommands = [
    { text: '/traffic', icon: AlertTriangle, label: 'Check Traffic' },
    { text: '/route', icon: Route, label: 'Plan Route' },
    { text: '/notifications', icon: Bell, label: 'Notifications' },
    { text: '/location', icon: MapPin, label: 'Set Location' }
  ];

  const stats = botService.getAdminStats();
  const statsDisplay = [
    { label: 'Active Users', value: stats.activeUsers.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Messages Today', value: stats.messagesToday.toLocaleString(), icon: MessageSquare, color: 'text-green-600' },
    { label: 'Traffic Reports', value: stats.trafficReports.toString(), icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Routes Planned', value: stats.routesPlanned.toString(), icon: BarChart3, color: 'text-purple-600' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = botService.getBotResponse(text.trim());
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Bot configuration has been updated successfully!",
    });
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'traffic': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'route': return <Route className="h-4 w-4 text-blue-500" />;
      case 'alert': return <Bell className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Traffic Assistant Bot
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time traffic updates, route planning, and automated notifications for your daily commute
          </p>
        </div>

        <Tabs defaultValue="bot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="bot" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Bot Interface
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin Panel
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bot">
            <div className="max-w-2xl mx-auto">
              <Card className="h-[600px] flex flex-col shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    Traffic Assistant Bot
                    <Badge variant="secondary" className="ml-auto">Online</Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isBot
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.isBot && getMessageIcon(message.type)}
                            <span className="text-sm whitespace-pre-wrap">{message.text}</span>
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                          <div className="flex items-center gap-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm ml-2">Bot is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex gap-2 mb-3 overflow-x-auto">
                      {quickCommands.map((cmd) => (
                        <Button
                          key={cmd.text}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(cmd.text)}
                          className="flex items-center gap-1 whitespace-nowrap"
                        >
                          <cmd.icon className="h-3 w-3" />
                          <span className="hidden sm:inline">{cmd.label}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about traffic, routes, or type a command..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleSendMessage()}
                        disabled={!inputText.trim() || isTyping}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsDisplay.map((stat) => (
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
            </div>
          </TabsContent>

          <TabsContent value="database">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Firebase Database Integration</h3>
              <div className="space-y-4 text-gray-600">
                <p>Your bot is configured to connect with Firebase for:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>User preferences and subscriptions</li>
                  <li>Traffic reports and community feedback</li>
                  <li>Route history and analytics</li>
                  <li>Notification settings and schedules</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Setup Instructions:</strong> Add your Firebase configuration in the admin panel to enable database features.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
