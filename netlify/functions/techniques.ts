import { Handler } from '@netlify/functions';
import { type BreathingTechnique } from '../../shared/schema';

const techniques: BreathingTechnique[] = [
  {
    id: 'deep',
    name: 'Deep Breathing',
    description: 'Simple inhale and exhale pattern for relaxation and stress relief.',
    icon: 'lungs',
    color: 'from-blue-400 to-blue-600',
    inhale: 2,
    exhale: 2,
    totalCycle: 4,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Four-count breathing used by Navy SEALs for focus and calm.',
    icon: 'square',
    color: 'from-purple-400 to-purple-600',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    totalCycle: 16,
  },
  {
    id: '478',
    name: '4-7-8 Technique',
    description: "Dr. Weil's technique for anxiety relief and better sleep.",
    icon: 'bed',
    color: 'from-green-400 to-green-600',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    totalCycle: 19,
  },
];

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
    const path = event.path.split('/').pop();
    
    // Get specific technique by ID
    if (path && path !== 'techniques') {
      const technique = techniques.find(t => t.id === path);
      if (!technique) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Technique not found' }),
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(technique),
      };
    }
    
    // Get all techniques
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(techniques),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
