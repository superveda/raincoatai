# RainCheck AI 🌦️

RainCheck AI is a smart weather prediction and event planning assistant that combines Singapore's weather data with AI-powered recommendations. It features a unique "Singaporean Mom" AI personality that provides caring (but nagging) weather advice in Singlish.

## Features

- 🌤️ Real-time weather forecasts for Singapore locations
- 🤖 AI-powered weather advice in Singlish
- 📅 Event planning with weather considerations
- 📱 Mobile-friendly, modern UI
- 🔄 Shareable weather forecasts

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **APIs**: 
  - Singapore Government Weather API
  - OpenAI GPT-3.5 Turbo
- **UI Components**: Custom components with Radix UI
- **Styling**: TailwindCSS with custom animations

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/raincheckai.git
cd raincheckai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API keys:
```env
# Weather API Configuration
NEXT_PUBLIC_WEATHER_API_URL=https://api.data.gov.sg/v1/environment/4-day-weather-forecast

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RainCheck AI
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features in Detail

### Weather Forecast
- 4-day weather forecast for Singapore locations
- Temperature, humidity, wind speed, and rain probability
- Visual weather indicators

### AI Mom Advice
- Personalized weather advice in Singlish
- Context-aware recommendations based on:
  - Weather conditions
  - Activity type
  - Location
  - Time of day

### Event Planning
- Date and time selection
- Location selection from Singapore regions
- Weather-based recommendations
- Shareable event cards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Singapore Government Data API
- OpenAI GPT API
- Next.js Team
- TailwindCSS Team
- Radix UI Team

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/raincheckai](https://github.com/yourusername/raincheckai)