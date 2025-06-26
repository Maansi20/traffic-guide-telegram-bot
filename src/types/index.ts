
export interface BotConfig {
  token: string;
  enabled: boolean;
  webhookUrl?: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface TrafficReport {
  id: string;
  type: 'accident' | 'construction' | 'heavy_traffic' | 'road_closure';
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  reportedBy: string;
  status: 'active' | 'resolved';
}

export interface User {
  chatId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  location?: string;
  preferences: UserPreferences;
  subscriptions: string[];
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  notifications: boolean;
  morningBriefing: boolean;
  eveningUpdate: boolean;
  alertTypes: string[];
  commuteRoute?: {
    from: string;
    to: string;
    days: string[];
    times: string[];
  };
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  trafficDelay: number;
  waypoints: RoutePoint[];
  alternativeRoutes: AlternativeRoute[];
}

export interface RoutePoint {
  lat: number;
  lng: number;
  address: string;
}

export interface AlternativeRoute {
  name: string;
  duration: number;
  distance: number;
  trafficCondition: 'light' | 'moderate' | 'heavy';
}

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'traffic' | 'route' | 'alert' | 'general';
}

export interface AdminStats {
  activeUsers: number;
  messagesToday: number;
  trafficReports: number;
  routesPlanned: number;
}
