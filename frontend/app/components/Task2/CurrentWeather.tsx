"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/lib/config";

interface WeatherData {
  feels_like: number;
  main: string;
  dt: number;
  temp: number;
  city: string;
  humidity: number;
}

interface CurrentWeatherProps {
  location: string;
}

const CurrentWeather = ({ location }: CurrentWeatherProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    // Fetch weather data using the provided API when the component mounts
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/weather/current/${location}`
        );

        const data = response.data;
        console.log(config);

        setWeatherData({
          feels_like: data.feels_like,
          main: data.main,
          dt: data.dt,
          temp: data.temp,
          city: data.city,
          humidity: data.humidity,
        });
      } catch (err) {
        console.log(err);
        setError("Failed to fetch weather data.");
      }
    };

    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    if (weatherData?.dt) {
      const date = new Date(weatherData.dt * 1000);
      setDateTime(date.toLocaleString());
    }
  }, [weatherData?.dt]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-2xl font-bold">{weatherData.city}</h1>
          <p>{dateTime}</p>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Temperature:</div>
            <div className="text-2xl font-bold">{weatherData.temp}°C</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Feels Like:</div>
            <div className="text-xl">{weatherData.feels_like}°C</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Humidity:</div>
            <div className="text-xl">{weatherData.humidity}%</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Weather Condition:</div>
            <div className="text-xl">{weatherData.main}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
