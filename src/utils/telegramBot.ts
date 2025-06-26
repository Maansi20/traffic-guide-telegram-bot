
import { BotConfig, TrafficReport, User, Route } from '../types/bot';

export class TelegramBotService {
  private config: BotConfig;
  private baseUrl: string;

  constructor(config: BotConfig) {
    this.config = config;
    this.baseUrl = `https://api.telegram.org/bot${config.token}`;
  }

  async sendMessage(chatId: string, text: string, options?: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          ...options,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  async sendTrafficUpdate(chatId: string, reports: TrafficReport[]): Promise<boolean> {
    const message = this.formatTrafficUpdate(reports);
    return this.sendMessage(chatId, message);
  }

  async sendRouteRecommendation(chatId: string, route: Route): Promise<boolean> {
    const message = this.formatRouteRecommendation(route);
    return this.sendMessage(chatId, message);
  }

  async sendNotification(chatId: string, title: string, message: string): Promise<boolean> {
    const formattedMessage = `🔔 <b>${title}</b>\n\n${message}`;
    return this.sendMessage(chatId, formattedMessage);
  }

  private formatTrafficUpdate(reports: TrafficReport[]): string {
    let message = '🚦 <b>Traffic Update</b>\n\n';
    
    reports.forEach(report => {
      const icon = this.getTrafficIcon(report.type);
      const severity = report.severity.toUpperCase();
      message += `${icon} <b>${report.location}</b>\n`;
      message += `   ${report.description}\n`;
      message += `   Severity: ${severity}\n\n`;
    });

    return message;
  }

  private formatRouteRecommendation(route: Route): string {
    let message = '🗺️ <b>Route Recommendation</b>\n\n';
    message += `📍 From: ${route.from}\n`;
    message += `📍 To: ${route.to}\n`;
    message += `🚗 Distance: ${route.distance} km\n`;
    message += `⏱️ Duration: ${route.duration} min\n`;
    
    if (route.trafficDelay > 0) {
      message += `⚠️ Traffic delay: +${route.trafficDelay} min\n`;
    }

    if (route.alternativeRoutes.length > 0) {
      message += '\n🔀 <b>Alternative Routes:</b>\n';
      route.alternativeRoutes.forEach((alt, index) => {
        message += `${index + 1}. ${alt.name} - ${alt.duration} min (${alt.trafficCondition} traffic)\n`;
      });
    }

    return message;
  }

  private getTrafficIcon(type: string): string {
    switch (type) {
      case 'accident': return '🚨';
      case 'construction': return '🚧';
      case 'heavy_traffic': return '🚗';
      case 'road_closure': return '🚫';
      default: return '⚠️';
    }
  }

  async setWebhook(webhookUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error setting webhook:', error);
      return false;
    }
  }
}

export const createInlineKeyboard = (buttons: Array<Array<{ text: string; callback_data: string }>>) => {
  return {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
};

export const createQuickReplies = () => {
  return createInlineKeyboard([
    [
      { text: '🚦 Traffic Status', callback_data: 'traffic_status' },
      { text: '🗺️ Plan Route', callback_data: 'plan_route' },
    ],
    [
      { text: '🔔 Notifications', callback_data: 'notifications' },
      { text: '📍 Set Location', callback_data: 'set_location' },
    ],
    [
      { text: '📢 Report Issue', callback_data: 'report_issue' },
      { text: '⚙️ Settings', callback_data: 'settings' },
    ],
  ]);
};
