import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sun, Share2, Copy, MapPin, Calendar, Clock, CloudRain, CloudSun, Wind } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { MomSays } from './mom-says'

interface ShareCardProps {
  eventName: string;
  location: string;
  date: string;
  time: string;
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    wind: number;
    rain: number;
  };
}

export function ShareCard({ eventName, location, date, time, weather }: ShareCardProps) {
  const handleShare = async () => {
    try {
      const shareData = {
        title: `Weather for ${eventName}`,
        text: `Check out the weather for ${eventName} at ${location} on ${date} at ${time}!`,
        url: window.location.href
      }

      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied!",
          description: "Share this link with your friends",
        })
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'Sunny':
        return <Sun className="h-20 w-20 text-yellow-400 animate-pulse" />
      case 'Cloudy':
        return <CloudSun className="h-20 w-20 text-gray-400 animate-bounce-slow" />
      case 'Rainy':
        return <CloudRain className="h-20 w-20 text-blue-400 animate-bounce-slow" />
      default:
        return <Cloud className="h-20 w-20 text-sky-400 animate-pulse" />
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/5 backdrop-blur-lg border-sky-200/10 overflow-hidden 
                     transform hover:scale-[1.01] transition-all duration-300
                     shadow-lg shadow-sky-900/20">
        <div className="p-8 space-y-8">
          {/* Event Details with Enhanced Styling */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text 
                          bg-gradient-to-r from-sky-200 to-indigo-200">
              {eventName}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sky-100/80">
              <div className="flex items-center space-x-2 bg-sky-900/20 rounded-full px-4 py-2
                            border border-sky-200/10 hover:bg-sky-800/20 transition-colors">
                <MapPin className="h-5 w-5 text-sky-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-sky-900/20 rounded-full px-4 py-2
                            border border-sky-200/10 hover:bg-sky-800/20 transition-colors">
                <Calendar className="h-5 w-5 text-sky-400" />
                <span>{date}</span>
              </div>
              <div className="flex items-center space-x-2 bg-sky-900/20 rounded-full px-4 py-2
                            border border-sky-200/10 hover:bg-sky-800/20 transition-colors">
                <Clock className="h-5 w-5 text-sky-400" />
                <span>{time}</span>
              </div>
            </div>
          </div>

          {/* Weather Info with Modern Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weather Icon Section */}
            <div className="flex items-center justify-center p-6 
                          bg-gradient-to-br from-sky-900/30 to-indigo-900/30 
                          rounded-2xl border border-sky-200/10">
              <WeatherIcon />
            </div>

            {/* Weather Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-sm text-sky-200 mb-1">Humidity</div>
                <div className="text-2xl font-semibold text-white flex items-center">
                  <Wind className="h-5 w-5 mr-2 text-sky-400" />
                  {weather.humidity}%
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-sm text-sky-200 mb-1">Wind</div>
                <div className="text-2xl font-semibold text-white flex items-center">
                  <Wind className="h-5 w-5 mr-2 text-sky-400" />
                  {weather.wind} mph
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-sm text-sky-200 mb-1">Rain</div>
                <div className="text-2xl font-semibold text-white flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-sky-400" />
                  {weather.rain}%
                </div>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white
                       hover:from-sky-600 hover:to-indigo-600
                       rounded-xl px-6 py-2 transform hover:scale-105 
                       transition-all duration-300 shadow-lg shadow-sky-900/20"
            >
              <Share2 className="h-5 w-5 mr-3" />
              Share Forecast
            </Button>
          </div>
        </div>
      </Card>

      {/* Mom Says section with updated styling */}
      <MomSays 
        weather={weather} 
        activity={eventName.toLowerCase().includes('sports') ? 'sports' : 'go out'} 
      />
    </div>
  )
} 