import React, { useState, useEffect } from 'react';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      // Step 1: Get User Coordinates
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Step 2: Get the weather.gov "points" (metadata for your grid location)
          const pointsRes = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
          if (!pointsRes.ok) throw new Error("Location not found in US database");
          
          const pointsData = await pointsRes.json();
          const forecastUrl = pointsData.properties.forecast;
          const city = pointsData.properties.relativeLocation.properties.city;
          const state = pointsData.properties.relativeLocation.properties.state;

          // Step 3: Get the actual forecast
          const forecastRes = await fetch(forecastUrl);
          if (!forecastRes.ok) throw new Error("Could not fetch forecast");
          
          const forecastData = await forecastRes.json();
          const current = forecastData.properties.periods[0]; // Current time block

          setWeather({
            location: `${city}, ${state}`,
            temp: current.temperature,
            condition: current.shortForecast,
            icon: current.icon,
            wind: current.windSpeed,
            humidity: current.relativeHumidity?.value || 0
          });
        } catch (err) {
          setError(err.message);
        }
      }, () => {
        setError("Location access denied. Please enable GPS.");
      });
    }

    fetchWeather();
  }, []);

  if (error || !weather) {
    return (
      <div className="bg-[#1a222e] text-white p-6 rounded-2xl flex items-center justify-center w-[450px] h-[200px] shadow-2xl border border-gray-800/50">
        <p className="text-sm text-gray-500 text-center px-4">
          {error ? `Status: ${error}` : "Detecting Location..."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a222e] text-white p-6 rounded-2xl flex items-center w-[450px] h-[200px] font-sans shadow-2xl border border-gray-800/50">
      
      {/* Left: Icon and Temp */}
      <div className="flex items-center gap-4 pr-6 border-r border-gray-700 h-full">
        <div className="flex-shrink-0 flex items-center justify-center bg-[#2a2a24] w-16 h-16 rounded-full shadow-inner overflow-hidden">
          <img 
            src={weather.icon} 
            alt="weather" 
            className="h-14 w-14 object-cover scale-125" 
          />
        </div>

        <div>
          <h2 className="text-gray-400 uppercase tracking-widest text-[9px] font-bold mb-1">
            📍 {weather.location}
          </h2>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black italic tracking-tighter">
              {weather.temp}°
            </h1>
            <div className="leading-none">
              <p className="text-[10px] font-black uppercase text-white w-24">
                {weather.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Stats */}
      <div className="flex gap-4 pl-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-base">💨</span>
          <p className="text-sm font-bold leading-none mt-1">{weather.wind.split(' ')[0]}</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">mph</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-base">💧</span>
          <p className="text-sm font-bold leading-none mt-1">{weather.humidity}%</p>
          <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Hum</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
