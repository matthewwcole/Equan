import { Handler } from '@netlify/functions';
import { sessionStatsSchema, type SessionStats } from '../../shared/schema';

// In-memory storage (for demo purposes - in production you'd use a database)
let sessionStats: SessionStats[] = [];

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
      body: JSON.stringify(sessionStats),
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const validation = sessionStatsSchema.safeParse(body);
      
      if (!validation.success) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Invalid session data' }),
        };
      }

      sessionStats.push(validation.data);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(validation.data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Failed to save session stats' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
