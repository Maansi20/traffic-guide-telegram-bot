
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, MapPin, Clock, AlertTriangle, Route, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'traffic' | 'route' | 'alert' | 'general';
}

export const TelegramBot = () => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickCommands = [
    { text: '/traffic', icon: AlertTriangle, label: 'Check Traffic' },
    { text: '/route', icon: Route, label: 'Plan Route' },
    { text: '/notifications', icon: Bell, label: 'Notifications' },
    { text: '/location', icon: MapPin, label: 'Set Location' }
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text.trim());
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.startsWith('/traffic') || input.includes('traffic')) {
      return {
        id: Date.now().toString(),
        text: '🚦 Current Traffic Conditions:\n\n📍 Highway 101: Heavy congestion (15 min delay)\n📍 Main Street: Light traffic\n📍 Downtown: Moderate traffic due to construction\n\n⚠️ Accident reported on Highway 1 - expect delays\n\nWould you like specific route information?',
        isBot: true,
        timestamp: new Date(),
        type: 'traffic'
      };
    }
    
    if (input.startsWith('/route') || input.includes('route')) {
      return {
        id: Date.now().toString(),
        text: '🗺️ Route Planning Available!\n\nPlease specify:\n• Starting location\n• Destination\n• Preferred departure time\n\nExample: "Route from Downtown to Airport at 3 PM"\n\nI\'ll provide the best route with current traffic conditions! 🚗',
        isBot: true,
        timestamp: new Date(),
        type: 'route'
      };
    }
    
    if (input.startsWith('/notifications') || input.includes('notification')) {
      return {
        id: Date.now().toString(),
        text: '🔔 Notification Settings:\n\n✅ Daily commute alerts: ON\n✅ Accident notifications: ON\n⏰ Morning briefing: 7:00 AM\n⏰ Evening update: 5:00 PM\n\nCustomize your preferences:\n• Set commute route\n• Choose notification times\n• Select alert types\n\nType /settings to modify preferences.',
        isBot: true,
        timestamp: new Date(),
        type: 'alert'
      };
    }
    
    if (input.startsWith('/location') || input.includes('location')) {
      return {
        id: Date.now().toString(),
        text: '📍 Location Services:\n\nCurrent location: San Francisco, CA\n\n🏠 Saved locations:\n• Home: 123 Main St\n• Work: Downtown Office\n• Favorite: Shopping Mall\n\nTo add a new location, type:\n"Add location [name] at [address]"\n\nExample: "Add location Gym at 456 Oak St"',
        isBot: true,
        timestamp: new Date(),
        type: 'general'
      };
    }
    
    if (input.startsWith('/help')) {
      return {
        id: Date.now().toString(),
        text: '📚 Available Commands:\n\n/traffic - Get current traffic conditions\n/route - Plan your route\n/notifications - Manage alerts\n/location - Location settings\n/report - Report traffic issues\n/subscribe - Subscribe to updates\n\n💬 Natural Language:\n• "What\'s traffic like on Highway 1?"\n• "Best route to airport?"\n• "Report accident on Main Street"\n• "Subscribe to morning alerts"',
        isBot: true,
        timestamp: new Date(),
        type: 'general'
      };
    }
    
    if (input.includes('report')) {
      return {
        id: Date.now().toString(),
        text: '📢 Traffic Report Submitted!\n\nThank you for helping the community! Your report has been:\n✅ Recorded in our database\n✅ Shared with other users\n✅ Sent to traffic authorities\n\nCommunity reports help everyone stay informed about:\n• Accidents and hazards\n• Construction zones\n• Road closures\n• Heavy traffic areas\n\nKeep reporting to help fellow commuters! 🤝',
        isBot: true,
        timestamp: new Date(),
        type: 'alert'
      };
    }

    // Default response for general queries
    return {
      id: Date.now().toString(),
      text: '🤖 I understand you\'re asking about traffic conditions!\n\nI can help with:\n• Real-time traffic updates\n• Route planning and optimization\n• Traffic alerts and notifications\n• Community reports\n\nTry asking:\n• "What\'s the traffic on [road name]?"\n• "Best route to [destination]?"\n• "Set up notifications for my commute"\n\nOr use quick commands like /traffic or /route! 🚗',
      isBot: true,
      timestamp: new Date(),
      type: 'general'
    };
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
  );
};
