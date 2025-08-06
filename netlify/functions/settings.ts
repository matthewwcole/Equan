import { Handler } from '@netlify/functions';
import { userSettingsSchema, type UserSettings } from '../../shared/schema';

// Default settings (in production you'd use a database or persistent storage)
let userSettings: UserSettings = {
  volume: 70,
  sessionDuration: 10,
  backgroundSound: 'ocean',
  voiceGuidance: true,
  darkMode: false,
};

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(userSettings),
    };
  }

  if (event.httpMethod === 'PATCH') {
    try {
      const body = JSON.parse(event.body || '{}');
      const validation = userSettingsSchema.partial().safeParse(body);
      
      if (!validation.success) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Invalid settings data' }),
        };
      }

      userSettings = { ...userSettings, ...validation.data };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(userSettings),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Failed to update settings' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
