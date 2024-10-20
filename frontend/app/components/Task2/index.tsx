"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrentWeather from "./CurrentWeather";
import DailyWeatherSummary from "./DailyWeatherSummary";
import Triggers from "./Triggers";

enum Location {
  Delhi = "Delhi",
  Mumbai = "Mumbai",
  Chennai = "Chennai",
  Bangalore = "Bangalore",
  Kolkata = "Kolkata",
  Hyderabad = "Hyderabad",
}

// Define the Tab Names
enum Tab {
  CurrentWeather = "Current Weather",
  DailyWeather = "Daily Weather",
  Triggers = "Triggers",
}

const Index = () => {
  const [location, setLocation] = useState<Location>(Location.Delhi);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CurrentWeather); // State to manage active tab

  const handleChangeLocation = (selectedValue: string) => {
    setLocation(selectedValue as Location);
  };

  const handleChangeTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.CurrentWeather:
        return <CurrentWeather location={location} />;
      case Tab.DailyWeather:
        return <DailyWeatherSummary location={location} />;
      case Tab.Triggers:
        return <Triggers location={location} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Location Selector */}
      <div className="flex justify-center my-4">
        <h1 className="text-lg font-bold mt-1 mx-2 mr-4">Select Location:</h1>
        <Select onValueChange={handleChangeLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={location} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Location).map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tab Headers */}
      <div className="flex justify-center space-x-6 my-6">
        <button
          className={`${
            activeTab === Tab.CurrentWeather
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } px-4 py-2 rounded-lg`}
          onClick={() => handleChangeTab(Tab.CurrentWeather)}
        >
          Current Weather
        </button>
        <button
          className={`${
            activeTab === Tab.DailyWeather
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } px-4 py-2 rounded-lg`}
          onClick={() => handleChangeTab(Tab.DailyWeather)}
        >
          Daily Weather Summary
        </button>
        <button
          className={`${
            activeTab === Tab.Triggers
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } px-4 py-2 rounded-lg`}
          onClick={() => handleChangeTab(Tab.Triggers)}
        >
          Triggers
        </button>
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Index;
