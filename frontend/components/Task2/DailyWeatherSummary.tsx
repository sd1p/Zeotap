"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "@/lib/config";

interface CurrentWeatherProps {
  location: string;
}

interface WeatherSummary {
  city: string;
  date: string;
  max_temp: number;
  dominant_condition: string;
  id: number;
  avg_temp: number;
  min_temp: number;
}

const DailyWeatherSummary = ({ location }: CurrentWeatherProps) => {
  const [weatherSummaries, setWeatherSummaries] = useState<WeatherSummary[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherSummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${config.Task2_API}/api/weather/daily_summary/${location}`
        );
        setWeatherSummaries(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherSummaries();
  }, [location]);

  if (loading) {
    return <div>Loading weather summaries...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold text-center mb-4">
        {location} Daily Weather Summary
      </h2>
      {weatherSummaries.length === 0 ? (
        <p>No weather summaries available.</p>
      ) : (
        weatherSummaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
          >
            <p className="font-semibold">Date: {summary.date}</p>
            <p>Min Temperature: {summary.min_temp}°C</p>
            <p>Max Temperature: {summary.max_temp}°C</p>
            <p>Average Temperature: {summary.avg_temp}°C</p>
            <p>Dominant Condition: {summary.dominant_condition}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyWeatherSummary;
