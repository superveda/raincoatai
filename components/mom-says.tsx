import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface MomSaysProps {
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    wind: number;
    rain: number;
  };
  activity?: string;
}

export function MomSays({ weather, activity = "go out" }: MomSaysProps) {
  const [momResponse, setMomResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateResponse = async () => {
      try {
        setIsLoading(true);
        console.log('Sending request with:', { weather, activity });
        
        const response = await fetch('/api/generate-mom-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ weather, activity }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate mom response');
        }

        const data = await response.json();
        console.log('Received response:', data);
        
        if (!data.response) {
          throw new Error('Invalid response format');
        }

        setMomResponse(data.response);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not generate mom's response",
          variant: "destructive",
        });
        setMomResponse("Aiyah, you going out again? Must take care of yourself hor!");
      } finally {
        setIsLoading(false);
      }
    };

    generateResponse();
  }, [weather, activity]);

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-500/20 rounded-lg">
            <MessageCircle className="h-6 w-6 text-pink-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Singaporean Mom Says</h3>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-4xl">👩</div>
            <div className="flex-1">
              <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/20">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse text-pink-100">Mom is thinking...</div>
                    <div className="animate-bounce">🤔</div>
                  </div>
                ) : (
                  <p className="text-pink-100 italic text-lg">
                    "{momResponse}"
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center text-sm text-pink-200/60">
                <span>💭 AI-powered Singaporean mom wisdom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-sky-200/60 italic">
          * Weather advice comes with complimentary mom concerns
        </div>
      </div>
    </Card>
  );
} 