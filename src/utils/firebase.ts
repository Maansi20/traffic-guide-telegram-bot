
import { FirebaseConfig, User, TrafficReport } from '../types/bot';

export class FirebaseService {
  private config: FirebaseConfig;
  private baseUrl: string;

  constructor(config: FirebaseConfig) {
    this.config = config;
    this.baseUrl = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents`;
  }

  async saveUser(user: User): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${user.chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
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
    try {
      const response = await fetch(`${this.baseUrl}/users/${chatId}`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return this.firestoreFieldsToUser(data.fields);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async saveTrafficReport(report: TrafficReport): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/traffic_reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    try {
      const response = await fetch(`${this.baseUrl}/traffic_reports?pageSize=50`);
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      
      if (!data.documents) {
        return [];
      }

      return data.documents
        .map((doc: any) => this.firestoreFieldsToReport(doc.fields))
        .filter((report: TrafficReport) => report.status === 'active');
    } catch (error) {
      console.error('Error getting traffic reports:', error);
      return [];
    }
  }

  async getUsersByLocation(location: string): Promise<User[]> {
    try {
      // This would typically use Firestore's query API
      // For demo purposes, returning empty array
      return [];
    } catch (error) {
      console.error('Error getting users by location:', error);
      return [];
    }
  }

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
