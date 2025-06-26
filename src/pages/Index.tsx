
import React, { useState } from 'react';
import { TelegramBot } from '../components/TelegramBot';
import { AdminPanel } from '../components/AdminPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Car, MessageCircle, Settings, Database } from 'lucide-react';

const Index = () => {
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
              <MessageCircle className="h-4 w-4" />
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
            <TelegramBot />
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel />
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

export default Index;
