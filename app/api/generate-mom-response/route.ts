import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with proper configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
});

export const runtime = 'edge'; // Optional: specify runtime if needed

export async function POST(req: Request) {
  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const { weather, activity } = await req.json();
    console.log('Received request:', { weather, activity });

    if (!weather || !activity) {
      return NextResponse.json(
        { error: 'Weather and activity are required' },
        { status: 400 }
      );
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a caring but nagging Singaporean mother who always worries about the weather affecting your child's health. Keep responses short and in Singlish."
          },
          {
            role: "user",
            content: `Current weather: ${weather.condition}, Temperature: ${weather.temp}°C, Humidity: ${weather.humidity}%, Rain chance: ${weather.rain}%
            Activity planned: ${activity}
            
            Generate a short, caring but nagging response in Singlish about the weather and plans. Include typical Singaporean mom expressions like "aiyah", "aiyo", "lah", "hor".
            Keep the response under 50 words.`
          }
        ],
        temperature: 0.7,
        max_tokens: 60,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      });

      const response = completion.choices[0].message.content;
      console.log('OpenAI Response:', response);

      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return NextResponse.json({ response });

    } catch (openaiError: any) {
      console.error('OpenAI API Error:', openaiError);
      // Return a default response if OpenAI fails
      return NextResponse.json({ 
        response: "Aiyah, weather like this also want to go out ah? Take care hor!" 
      });
    }

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate mom response' },
      { status: 500 }
    );
  }
} 