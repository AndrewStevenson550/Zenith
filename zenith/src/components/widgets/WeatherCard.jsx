import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Note: Your error shows key '5146f0a9...' is being used. 
  // Ensure this is exactly what is in your Vercel/Local .env
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      if (!apiKey) {
        setError("API Key missing from .env");
        return;
      }

      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&aqi=no`;
        const response = await fetch(url);
        
        if (!response.ok) {
          // 401 fix: If key is wrong, this catches it
          const data = await response.json();
          setError(data.error.message || `Error: ${response.status}`);
          return;
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError("Network error");
      }
    }

    fetchWeather();
  }, [apiKey]);

  // Maintain layout even during error/loading
  if (error || !weather) {
    return (
      <div className="bg-[#1a222e] text-white p-6 rounded-2xl flex items-center justify-center w-[450px] h-[200px] shadow-2xl border border-gray-800/50">
        <p className="text-sm text-gray-500 text-center px-4">
          {error ? `Weather Status: ${error}` : "Loading Weather..."}
        </p>
      </div>
    );
  }

  return (
    /* REMOVED: -mt-15 and ml-100. Let the App.jsx Flexbox handle it. */
    <div className="bg-[#1a222e] text-white p-6 rounded-2xl flex items-center w-[450px] h-[200px] font-sans shadow-2xl border border-gray-800/50">
      
      {/* Left: Icon and Temp */}
      <div className="flex items-center gap-4 pr-6 border-r border-gray-700 h-full">
        <div className="flex-shrink-0 flex items-center justify-center bg-[#2a2a24] w-16 h-16 rounded-full shadow-inner">
          <img 
            src={weather.current?.condition?.icon} 
            alt="weather" 
            className="h-12 w-12 object-contain" 
          />
        </div>

        <div>
          <h2 className="text-gray-400 uppercase tracking-widest text-[9px] font-bold mb-1">
            📍 {weather.location?.name}
          </h2>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black italic tracking-tighter">
              {Math.round(weather.current?.temp_f)}°
            </h1>
            <div className="leading-none">
              <p className="text-sm font-black uppercase text-white">
                {weather.current?.condition?.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Stats */}
      <div className="flex gap-4 pl-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-base">💨</span>
          <p className="text-base font-bold leading-none mt-1">{weather.current?.wind_mph}</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">mph</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-base">💧</span>
          <p className="text-base font-bold leading-none mt-1">{weather.current?.humidity}%</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Hum</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;