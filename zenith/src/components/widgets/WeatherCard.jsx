import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      if (!apiKey) return;
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (err) { setError("Network error"); }
    }
    fetchWeather();
  }, [apiKey]);

  if (error || !weather) return null; // Hide if error to prevent layout breaking

  return (
    <div className="bg-[#1a222e] text-white p-6 rounded-2xl flex items-center w-full max-w-xl shadow-2xl border border-gray-800/50 h-[200px]">
      <div className="flex items-center gap-6 pr-8 border-r border-gray-700 h-full">
        <div className="flex-shrink-0 flex items-center justify-center bg-[#2a2a24] w-20 h-20 rounded-full shadow-inner">
          <img src={weather.current?.condition?.icon} alt="icon" className="h-14 w-14 object-contain" />
        </div>
        <div>
          <h2 className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">📍 {weather.location?.name}</h2>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black italic tracking-tighter">{Math.round(weather.current?.temp_f)}°</h1>
            <div className="leading-tight">
              <p className="text-lg font-black uppercase">{weather.current?.condition?.text.split(' ')[0]}</p>
              <p className="text-lg font-black uppercase">{weather.current?.condition?.text.split(' ')[1] || ''}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 pl-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-1 text-lg">💨</span>
          <p className="text-lg font-bold leading-none">{weather.current?.wind_mph}</p>
          <p className="text-[10px] font-bold opacity-60">mph</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold mt-1">Wind</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="mb-1 text-lg">💧</span>
          <p className="text-lg font-bold leading-none">{weather.current?.humidity}%</p>
          <p className="text-[10px] font-bold opacity-60">hum</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold mt-1">Humidity</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;