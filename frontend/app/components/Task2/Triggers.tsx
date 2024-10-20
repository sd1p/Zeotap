"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTrigger from "./AddTRigger"; // Import the new AddTrigger component
import config from "@/lib/config";

interface Trigger {
  id: number;
  condition: string;
  current_value: number;
  user_email: string;
  threshold: number;
  city: string;
  timestamp: string;
}

interface TriggersProps {
  location: string; // location to fetch alerts
}

const Triggers = ({ location }: TriggersProps) => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [email, setEmail] = useState<string>("user@example.com");
  const [temperatureThreshold, setTemperatureThreshold] = useState<number>(28);
  const [temperatureAbove, setTemperatureAbove] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchTriggers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${config.Task2_API}/api/alerts/${location}`
      );
      setTriggers(response.data); // Set the fetched alerts
    } catch {
      setError("Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTriggers();
  }, [location]);

  const renderAlerts = () => {
    return triggers.map((trigger) => (
      <div
        key={trigger.id}
        className="bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
      >
        <p className="font-semibold">
          Condition:{" "}
          {trigger.condition === "temperature_above" ? "Above" : "Below"}{" "}
          {trigger.threshold}°C
        </p>
        <p>Current Value: {trigger.current_value}°C</p>
        <p>Threshold: {trigger.threshold}°C</p>
        <p>Email: {trigger.user_email}</p>
        <p>City: {trigger.city}</p>
        <p>Timestamp: {new Date(trigger.timestamp).toLocaleString()}</p>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading triggers...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold text-center mb-4">
        Triggers for {location}
      </h2>

      <AddTrigger
        location={location}
        onTriggerAdded={() => fetchTriggers()} // Callback to re-fetch triggers
        email={email}
        setEmail={setEmail}
        temperatureThreshold={temperatureThreshold}
        setTemperatureThreshold={setTemperatureThreshold}
        temperatureAbove={temperatureAbove}
        setTemperatureAbove={setTemperatureAbove}
        setError={setError}
      />

      <h3 className="font-semibold">Current Triggers</h3>
      {triggers.length === 0 ? <p>No triggers set.</p> : renderAlerts()}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Triggers;
