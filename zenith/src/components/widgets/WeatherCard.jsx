import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API Key missing");
      return;
    }

    async function fetchWeather() {
      try {
        // We use 'auto:ip' which tells WeatherAPI to look at the request's IP address
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&aqi=no`;
        
        const response = await fetch(url);
        if (!response.ok){ 
          console.error("WeatherAPI Error Details:", errorData.error.message);
          throw new Error("Weather data fetch failed");
          
        }
        
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);

      }
    }

    fetchWeather();
  }, [apiKey]);

  if (error) return <div className='text-red-400 p-8 font-bold'>Error: {error}</div>;
  if (!weather) return <div className='text-white p-8 animate-pulse'>Loading Weather...</div>;

  return (
    <div className="bg-[#1a222e] text-white p-8 rounded-2xl flex items-center max-w-3xl font-sans shadow-2xl border border-gray-800/50">
      
      <div className="flex items-center gap-8 pr-12 border-r border-gray-700">
        <div className="flex items-center justify-center bg-[#2a2a24] w-28 h-28 rounded-full shadow-inner">
          <img 
            src={weather.current?.condition?.icon} 
            alt="weather icon" 
            className="h-20 w-20 object-contain" 
          />
        </div>

        <div>
          <h2 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-1">
            📍 {weather.location?.name}
          </h2>
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-black italic tracking-tighter">
              {Math.round(weather.current?.temp_f)}°
            </h1>
            <div className="leading-tight">
              <p className="text-2xl font-black uppercase tracking-tight text-white">
                {weather.current?.condition?.text.split(' ')[0]}
              </p>
              <p className="text-2xl font-black uppercase tracking-tight text-white">
                {weather.current?.condition?.text.split(' ')[1] || ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 pl-10">
        <div className="flex flex-col items-center text-center">
          <span className="mb-2 text-xl opacity-70">💨</span>
          <p className="text-xl font-bold leading-none">{weather.current?.wind_mph}</p>
          <p className="text-sm font-bold mb-1">mph</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Wind</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="mb-2 text-xl opacity-70">💧</span>
          <p className="text-xl font-bold mb-1">{weather.current?.humidity}%</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Humidity</p>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;