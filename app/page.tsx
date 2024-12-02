"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cloud, Umbrella, Sun, Calendar, MapPin, Clock, CloudRain, CloudSun, Wind, Share2, Copy } from 'lucide-react'
import { ShareCard } from '@/components/share-card'
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    location: '',
    date: '',
    time: ''
  })
  const [showShareCard, setShowShareCard] = useState(false)
  const [weatherData, setWeatherData] = useState({
    temp: 72,
    condition: 'Sunny',
    humidity: 65,
    wind: 8,
    rain: 0
  })

  const testWeatherAPI = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      console.log('Testing API with date:', today);
      
      const response = await fetch(`/api/weather?date=${today}`);
      console.log('API Response status:', response.status);
      
      const data = await response.json();
      console.log('Weather API Response:', data);
      
      toast({
        title: "API Test Result",
        description: JSON.stringify(data, null, 2),
      });
    } catch (error) {
      console.error('API Test Error:', error);
      toast({
        title: "API Test Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive"
      });
    }
  };

  const handleCheckWeather = async () => {
    try {
      if (!eventDetails.date || !eventDetails.location) {
        toast({
          title: "Missing information",
          description: "Please provide both date and location"
        });
        return;
      }

      console.log('Fetching weather for:', {
        date: eventDetails.date,
        location: eventDetails.location
      });

      const response = await fetch(
        `/api/weather?date=${eventDetails.date}&location=${encodeURIComponent(eventDetails.location)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          cache: 'no-store'
        }
      );

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      console.log('Weather data:', data);

      if (!data || typeof data.temp === 'undefined') {
        throw new Error('Invalid weather data received');
      }

      setWeatherData(data);
      setShowShareCard(true);
      
      toast({
        title: "Weather Updated",
        description: `Current condition: ${data.condition}, Temperature: ${data.temp}°C`,
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to fetch weather data',
        variant: "destructive"
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900">
      {/* Updated Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Modern grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        {/* Soft glow effects */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-sky-400/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-indigo-400/10 via-transparent to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header with updated colors */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-indigo-200 mb-4">
            RainCheck AI
          </h1>
          <p className="text-sky-200/80 text-lg">
            Smart weather predictions for your event planning
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Input Form Card */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 text-white">
                <div className="p-3 bg-sky-500/20 rounded-xl">
                  <Calendar className="h-6 w-6 text-sky-400" />
                </div>
                <h2 className="text-2xl font-semibold">Plan Your Event</h2>
              </div>
              
              <div className="space-y-6">
                {/* Event Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 
                             focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300
                             group-hover:bg-white/10"
                    value={eventDetails.eventName}
                    onChange={(e) => setEventDetails({ ...eventDetails, eventName: e.target.value })}
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-xl"></div>
                </div>

                {/* Location Input */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 
                             focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300
                             group-hover:bg-white/10"
                    value={eventDetails.location}
                    onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                  />
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-sky-400" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-xl"></div>
                </div>

                {/* Date and Time Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                               focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300
                               group-hover:bg-white/10"
                      value={eventDetails.date}
                      onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-xl"></div>
                  </div>
                  <div className="relative group">
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                               focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300
                               group-hover:bg-white/10"
                      value={eventDetails.time}
                      onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                    />
                    <Clock className="absolute right-3 top-3 h-5 w-5 text-sky-400" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-xl"></div>
                  </div>
                </div>
              </div>

              {/* Check Weather Button */}
              <Button 
                onClick={handleCheckWeather}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-6 rounded-xl text-lg font-semibold
                         transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25"
              >
                <Sun className="mr-2 h-5 w-5" />
                Check Weather Forecast
              </Button>
            </div>
          </Card>

          {/* Share Card */}
          {showShareCard && (
            <div className="animate-fade-in-up">
              <ShareCard
                eventName={eventDetails.eventName || "My Event"}
                location={eventDetails.location || "Singapore"}
                date={eventDetails.date || "2024-02-20"}
                time={eventDetails.time || "14:00"}
                weather={weatherData}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
