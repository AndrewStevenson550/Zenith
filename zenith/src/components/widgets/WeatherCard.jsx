import React, { useState, useEffect } from 'react';
import {urlWeather} from "../../api_keys/weather";

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
      <div className=' bg-secondary ml-85 -mt-37'>
        <div className=' align-center'>
          <img src={weather.current.condition.icon} alt="sunny/windy/snowy/ect" />

        </div>
        <div className=' font-inter font=[900]'>
          h
        </div>
      </div>
    </>
  );
}

export default WeatherCard;