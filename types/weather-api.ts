export interface WeatherAPIResponse {
  code: number;
  errorMsg: string | null;
  data: {
    records: Array<{
      date: string;
      updatedTimestamp: string;
      timestamp: string;
      forecasts: Array<{
        timestamp: string;
        temperature: {
          low: number;
          high: number;
          unit: string;
        };
        relativeHumidity: {
          low: number;
          high: number;
          unit: string;
        };
        forecast: {
          summary: string;
          code: string;
          text: WeatherCondition;
        };
        day: WeekDay;
        wind: {
          speed: {
            low: number;
            high: number;
          };
          direction: string;
        };
      }>;
    }>;
  };
}

export type WeatherCondition =
  | "Fair"
  | "Fair (Day)"
  | "Fair (Night)"
  | "Fair and Warm"
  | "Partly Cloudy"
  | "Partly Cloudy (Day)"
  | "Partly Cloudy (Night)"
  | "Cloudy"
  | "Hazy"
  | "Slightly Hazy"
  | "Windy"
  | "Mist"
  | "Fog"
  | "Light Rain"
  | "Moderate Rain"
  | "Heavy Rain"
  | "Passing Showers"
  | "Light Showers"
  | "Showers"
  | "Heavy Showers"
  | "Thundery Showers"
  | "Heavy Thundery Showers"
  | "Heavy Thundery Showers with Gusty Winds";

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"; 