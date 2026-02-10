import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // SECURE: Pull from Vercel Environment Variables
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      if (!apiKey) {
        setError("API Key missing");
        return;
      }

      try {
        // Using auto:ip as you suggested for automatic location
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&aqi=no`;
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorBody = await response.text();
          try {
            const jsonError = JSON.parse(errorBody);
            setError(jsonError.error.message);
          } catch (e) {
            setError(`Error: ${response.status}`);
          }
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

  // Loading/Error states styled to maintain layout space
  if (error || !weather) {
    return (
      <div className="bg-[#1a222e] text-white p-9 rounded-2xl flex items-center w-full max-w-2xl font-sans shadow-2xl border border-gray-800/50 ml-100 -mt-50">
        <p className={error ? "text-red-400" : "animate-pulse"}>
          {error ? `Weather Error: ${error}` : "Detecting Local Weather..."}
        </p>
      </div>
    );
  }

  return (
    /* CSS FIXES:
       - mx-auto: Centers the card horizontally
       - w-full max-w-2xl: Gives it a standard size to sit between widgets
       - flex: Keeps internal items aligned
    */
    <div className="bg-[#1a222e] text-white p-9 rounded-2xl flex items-center w-full  font-sans shadow-2xl border border-gray-800/50 -mt-15">
      
      {/* Left Section: Icon and Temperature */}
      <div className="flex items-center gap-6 pr-10 -pt-10 border-r border-gray-700">
        <div className="flex items-center justify-center bg-[#2a2a24] w-24 h-24 rounded-full shadow-inner">
          <img 
            src={weather.current?.condition?.icon} 
            alt="weather icon" 
            className="h-16 w-16 object-contain" 
          />
        </div>

        <div>
          <h2 className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">
            📍 {weather.location?.name}
          </h2>
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-black italic tracking-tighter">
              {Math.round(weather.current?.temp_f)}°
            </h1>
            <div className="leading-none">
              <p className="text-xl font-black uppercase tracking-tight text-white">
                {weather.current?.condition?.text.split(' ')[0]}
              </p>
              <p className="text-xl font-black uppercase tracking-tight text-white">
                {weather.current?.condition?.text.split(' ')[1] || ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Wind and Humidity */}
      <div className="flex gap-8 pl-10">
        <div className="flex flex-col items-center text-center">
          <span className="mb-1 text-lg opacity-70">💨</span>
          <p className="text-lg font-bold leading-none">{weather.current?.wind_mph}</p>
          <p className="text-[10px] font-bold mb-1 opacity-60">mph</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Wind</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="mb-1 text-lg opacity-70">💧</span>
          <p className="text-lg font-bold mb-1">{weather.current?.humidity}%</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Humidity</p>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;