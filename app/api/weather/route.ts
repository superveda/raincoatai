import { NextResponse } from 'next/server';
import { getWeatherForecast, mapWeatherCondition } from '@/services/weather';

// Define the dynamic and runtime configurations
export const dynamic = 'force-dynamic'; // Forces dynamic rendering
export const runtime = 'edge'; // Set the runtime to edge

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const location = searchParams.get('location');

    console.log('API Route received request:', { date, location });

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    try {
      const forecasts = await getWeatherForecast(date);
      console.log('Received forecasts:', forecasts);

      // Use the first forecast if no location is provided
      let forecast = forecasts[0];

      // If location is provided, try to find a matching forecast
      if (location) {
        const matchingForecast = forecasts.find((f: any) => {
          const forecastArea = f.area?.toLowerCase() || '';
          const searchLocation = location.toLowerCase();
          return forecastArea.includes(searchLocation) || searchLocation.includes(forecastArea);
        });

        if (!matchingForecast) {
          const availableLocations = forecasts.map((f: any) => f.area).filter(Boolean);
          console.log('Available locations:', availableLocations);
          return NextResponse.json(
            { error: `Location not found. Available locations: ${availableLocations.join(', ')}` },
            { status: 404 }
          );
        }

        forecast = matchingForecast;
      }

      const weatherData = {
        temp: Math.round((forecast.temperature.high + forecast.temperature.low) / 2),
        condition: mapWeatherCondition(forecast.forecast),
        humidity: Math.round((forecast.relative_humidity.high + forecast.relative_humidity.low) / 2),
        wind: Math.round((forecast.wind.speed.low + forecast.wind.speed.high) / 2),
        rain: forecast.forecast.toLowerCase().includes('rain') ? 80 : 20,
      };

      console.log('Sending weather data:', weatherData);
      return NextResponse.json(weatherData);

    } catch (error) {
      console.error('Error processing weather data:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to process weather data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 