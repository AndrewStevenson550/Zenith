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
      <div className="bg-[#1a222e] text-white p-8 rounded-2xl flex items-center max-w-3xl font-sans ml-98 -mt-50">

        <div className="flex items-center gap-8 pr-20 border-r border-gray-700">
          <div className="flex items-center justify-center bg-[#2a2a24] w-32 h-32 rounded-full">
            <img src={weather.current.condition.icon} alt="weather icon" className="h-21 w-21 object-contain" />
          </div>

          <div>
            <h2 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-1">
              {weather.location.name}
            </h2>
            <div className="flex items-center gap-6">
              <h1 className="text-7xl font-black italic tracking-tighter">
                {weather.current.temp_f}°
              </h1>
              <div className="leading-tight">
                <p className="text-3xl font-black uppercase tracking-tight">Clear</p>
                <p className="text-3xl font-black uppercase tracking-tight">Sky</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-12 pl-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-2 text-gray-400">💨</div>
            <p className="text-xl font-bold leading-none">{weather.current.wind_mph}</p>
            <p className="text-xl font-bold mb-1">mph</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wind</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-2 text-gray-400 text-xl">💧</div>
            <p className="text-xl font-bold mb-1">{weather.current.humidity}%</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Humidity</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default WeatherCard;