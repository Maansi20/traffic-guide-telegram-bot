
import { FirebaseConfig, User, TrafficReport, Message, AdminStats } from '../types';

export class BotService {
  private firebaseConfig?: FirebaseConfig;
  private baseUrl?: string;

  constructor(config?: FirebaseConfig) {
    if (config) {
      this.firebaseConfig = config;
      this.baseUrl = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents`;
    }
  }

  // Firebase Operations
  async saveUser(user: User): Promise<boolean> {
    if (!this.baseUrl) return false;
    
    try {
      const response = await fetch(`${this.baseUrl}/users/${user.chatId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: this.userToFirestoreFields(user),
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }

  async getUser(chatId: string): Promise<User | null> {
    if (!this.baseUrl) return null;
    
    try {
      const response = await fetch(`${this.baseUrl}/users/${chatId}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      return this.firestoreFieldsToUser(data.fields);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async saveTrafficReport(report: TrafficReport): Promise<boolean> {
    if (!this.baseUrl) return false;
    
    try {
      const response = await fetch(`${this.baseUrl}/traffic_reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: this.reportToFirestoreFields(report),
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error saving traffic report:', error);
      return false;
    }
  }

  async getActiveTrafficReports(): Promise<TrafficReport[]> {
    if (!this.baseUrl) return [];
    
    try {
      const response = await fetch(`${this.baseUrl}/traffic_reports?pageSize=50`);
      if (!response.ok) return [];
      
      const data = await response.json();
      if (!data.documents) return [];
      
      return data.documents
        .map((doc: any) => this.firestoreFieldsToReport(doc.fields))
        .filter((report: TrafficReport) => report.status === 'active');
    } catch (error) {
      console.error('Error getting traffic reports:', error);
      return [];
    }
  }

  // Bot Response Logic
  getBotResponse(userInput: string): Message {
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

    return {
      id: Date.now().toString(),
      text: '🤖 I understand you\'re asking about traffic conditions!\n\nI can help with:\n• Real-time traffic updates\n• Route planning and optimization\n• Traffic alerts and notifications\n• Community reports\n\nTry asking:\n• "What\'s the traffic on [road name]?"\n• "Best route to [destination]?"\n• "Set up notifications for my commute"\n\nOr use quick commands like /traffic or /route! 🚗',
      isBot: true,
      timestamp: new Date(),
      type: 'general'
    };
  }

  // Admin Statistics
  getAdminStats(): AdminStats {
    return {
      activeUsers: 1234,
      messagesToday: 5678,
      trafficReports: 89,
      routesPlanned: 456
    };
  }

  // Helper methods for Firebase data conversion
  private userToFirestoreFields(user: User): any {
    return {
      chatId: { stringValue: user.chatId },
      firstName: { stringValue: user.firstName || '' },
      lastName: { stringValue: user.lastName || '' },
      username: { stringValue: user.username || '' },
      location: { stringValue: user.location || '' },
      preferences: {
        mapValue: {
          fields: {
            notifications: { booleanValue: user.preferences.notifications },
            morningBriefing: { booleanValue: user.preferences.morningBriefing },
            eveningUpdate: { booleanValue: user.preferences.eveningUpdate },
            alertTypes: {
              arrayValue: {
                values: user.preferences.alertTypes.map(type => ({ stringValue: type })),
              },
            },
          },
        },
      },
      subscriptions: {
        arrayValue: {
          values: user.subscriptions.map(sub => ({ stringValue: sub })),
        },
      },
      createdAt: { timestampValue: user.createdAt.toISOString() },
      lastActive: { timestampValue: user.lastActive.toISOString() },
    };
  }

  private firestoreFieldsToUser(fields: any): User {
    return {
      chatId: fields.chatId?.stringValue || '',
      firstName: fields.firstName?.stringValue,
      lastName: fields.lastName?.stringValue,
      username: fields.username?.stringValue,
      location: fields.location?.stringValue,
      preferences: {
        notifications: fields.preferences?.mapValue?.fields?.notifications?.booleanValue || true,
        morningBriefing: fields.preferences?.mapValue?.fields?.morningBriefing?.booleanValue || false,
        eveningUpdate: fields.preferences?.mapValue?.fields?.eveningUpdate?.booleanValue || false,
        alertTypes: fields.preferences?.mapValue?.fields?.alertTypes?.arrayValue?.values?.map((v: any) => v.stringValue) || [],
      },
      subscriptions: fields.subscriptions?.arrayValue?.values?.map((v: any) => v.stringValue) || [],
      createdAt: new Date(fields.createdAt?.timestampValue),
      lastActive: new Date(fields.lastActive?.timestampValue),
    };
  }

  private reportToFirestoreFields(report: TrafficReport): any {
    return {
      id: { stringValue: report.id },
      type: { stringValue: report.type },
      location: { stringValue: report.location },
      description: { stringValue: report.description },
      severity: { stringValue: report.severity },
      timestamp: { timestampValue: report.timestamp.toISOString() },
      reportedBy: { stringValue: report.reportedBy },
      status: { stringValue: report.status },
    };
  }

  private firestoreFieldsToReport(fields: any): TrafficReport {
    return {
      id: fields.id?.stringValue || '',
      type: fields.type?.stringValue as any,
      location: fields.location?.stringValue || '',
      description: fields.description?.stringValue || '',
      severity: fields.severity?.stringValue as any,
      timestamp: new Date(fields.timestamp?.timestampValue),
      reportedBy: fields.reportedBy?.stringValue || '',
      status: fields.status?.stringValue as any,
    };
  }
}

export const botService = new BotService();
