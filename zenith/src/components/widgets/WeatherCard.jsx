import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // SECURE: This pulls from your Vercel Environment Variables
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      // 1. Check if the key exists at all
      if (!apiKey) {
        setError("API Key is missing. Check Vercel Environment Variables.");
        return;
      }

      try {
        // 2. We use auto:ip to detect location based on the user's connection
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&aqi=no`;
        
        const response = await fetch(url);
        
        // 3. Handle non-JSON errors (like 404s or 403s)
        if (!response.ok) {
          const errorBody = await response.text();
          console.error("WeatherAPI Error Response:", errorBody);
          
          // Try to parse the specific error message from the API
          try {
            const jsonError = JSON.parse(errorBody);
            setError(jsonError.error.message);
          } catch (e) {
            setError(`Error: ${response.status} ${response.statusText}`);
          }
          return;
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Network error:", err);
        setError("Failed to reach the weather server.");
      }
    }

    fetchWeather();
  }, [apiKey]);

  // Display Error State
  if (error) {
    return (
      <div className="bg-[#1a222e] text-red-400 p-8 rounded-2xl max-w-3xl border border-red-900/50">
        <p className="font-bold">Weather Error:</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  // Display Loading State
  if (!weather) {
    return (
      <div className="bg-[#1a222e] text-white p-8 rounded-2xl max-w-3xl animate-pulse">
        <p className="tracking-widest uppercase text-xs font-bold opacity-50">Detecting Location...</p>
      </div>
    );
  }

  // Display Final Weather Card
  return (
    <div className="bg-[#1a222e] text-white p-8 rounded-2xl flex items-center max-w-3xl font-sans shadow-2xl border border-gray-800/50">
      
      {/* Left: Icon and Temp */}
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

      {/* Right: Stats */}
      <div className="flex gap-10 pl-10">
        <div className="flex flex-col items-center text-center">
          <span className="mb-2 text-xl opacity-70">💨</span>
          <p className="text-xl font-bold">{weather.current?.wind_mph}</p>
          <p className="text-xs font-bold mb-1 opacity-60">mph</p>
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