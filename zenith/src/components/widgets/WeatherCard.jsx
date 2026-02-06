import React, { useState, useEffect } from 'react';
import { urlWeather } from "../../api_keys/weather";

function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(urlWeather); // Spelled with 's'
        const data = await response.json();
        console.log('Data Received:', data);
        setWeather(data);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    fetchWeather();
  }, []);

  // THE GUARD: This prevents the 'null' error
  if (!weather) return <div className='text-white'>Loading...</div>;

  return (
    <>
      <div class="bg-[#1a222e] text-white p-8 rounded-2xl flex items-center max-w-2xl font-sans ml-105 -mt-50">

        <div class="flex items-center gap-8 pr-12 border-r border-gray-700">
          <div class="bg-[#2a2a24] p-6 rounded-full">
            <img src={weather.current.condition.icon} alt="weather icon" class="w-64 " />
          </div>

          <div>
            <h2 class="text-gray-400 uppercase tracking-widest text-sm font-bold mb-1">
              {weather.location.name}
            </h2>
            <div class="flex items-center gap-6">
              <h1 class="text-7xl font-black italic tracking-tighter">
                {weather.current.temp_f}°
              </h1>
              <div class="leading-tight">
                <p class="text-3xl font-black uppercase tracking-tight">Clear</p>
                <p class="text-3xl font-black uppercase tracking-tight">Sky</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-12 pl-12">
          <div class="flex flex-col items-center text-center">
            <div class="mb-2 text-gray-400">💨</div>
            <p class="text-xl font-bold leading-none">{weather.current.wind_mph}</p>
            <p class="text-xl font-bold mb-1">mph</p>
            <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wind</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="mb-2 text-gray-400 text-xl">💧</div>
            <p class="text-xl font-bold mb-1">{weather.current.humidity}%</p>
            <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Humidity</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default WeatherCard;