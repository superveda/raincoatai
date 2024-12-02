import { WeatherAPIResponse } from '@/types/weather-api';

const BASE_URL = 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast';

export async function getWeatherForecast(date: string) {
  try {
    console.log('Fetching weather from:', BASE_URL);
    
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API Response:', data);

    if (!data?.items?.[0]?.forecasts) {
      console.error('Invalid data structure:', data);
      throw new Error('Invalid or missing forecast data');
    }

    const forecasts = data.items[0].forecasts;
    console.log('Processed forecasts:', forecasts);

    if (!Array.isArray(forecasts) || forecasts.length === 0) {
      throw new Error('No forecast data available');
    }

    return forecasts.map(forecast => ({
      area: forecast.area,
      temperature: {
        high: forecast.temperature.high,
        low: forecast.temperature.low
      },
      relative_humidity: {
        high: forecast.relative_humidity.high,
        low: forecast.relative_humidity.low
      },
      wind: {
        speed: {
          low: forecast.wind.speed.low,
          high: forecast.wind.speed.high
        },
        direction: forecast.wind.direction
      },
      forecast: forecast.forecast
    }));

  } catch (error) {
    console.error('Error in getWeatherForecast:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch weather data');
  }
}

export function mapWeatherCondition(forecast: any) {
  console.log('Mapping weather condition:', forecast);

  const conditionMap: { [key: string]: string } = {
    'Partly Cloudy': 'Cloudy',
    'Partly Cloudy (Day)': 'Cloudy',
    'Partly Cloudy (Night)': 'Cloudy',
    'Cloudy': 'Cloudy',
    'Light Rain': 'Rainy',
    'Moderate Rain': 'Rainy',
    'Heavy Rain': 'Rainy',
    'Passing Showers': 'Rainy',
    'Light Showers': 'Rainy',
    'Showers': 'Rainy',
    'Heavy Showers': 'Rainy',
    'Thundery Showers': 'Rainy',
    'Heavy Thundery Showers': 'Rainy',
    'Fair': 'Sunny',
    'Fair (Day)': 'Sunny',
    'Fair (Night)': 'Sunny',
    'Sunny': 'Sunny',
    'Fair & Warm': 'Sunny',
  };

  const text = typeof forecast === 'string' ? forecast : forecast.forecast;
  const condition = conditionMap[text] || 'Cloudy';
  console.log('Mapped condition:', condition);
  return condition;
}

export function isValidSingaporeLocation(location: string): boolean {
  const validLocations = JSON.parse(process.env.NEXT_PUBLIC_SINGAPORE_REGIONS || '[]');
  return validLocations.some((validLocation: string) => 
    location.toLowerCase().includes(validLocation.toLowerCase())
  );
}

export function getWeatherIcon(condition: string) {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return 'sun';
    case 'cloudy':
      return 'cloud';
    case 'rainy':
      return 'cloud-rain';
    default:
      return 'cloud';
  }
} 