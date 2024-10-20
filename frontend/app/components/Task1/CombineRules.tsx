"use client";
import React, { useState } from "react";
import axios from "axios";

interface ApiResponse {
  Node?: object;
  error?: string;
}

const CombineRules = () => {
  const [rules, setRules] = useState<string[]>([""]);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleRemoveRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const data = JSON.stringify({ rules });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/combine_rules",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("API Response:", response.data); // Log the response
      setResponse(response.data);
    } catch (error: any) {
      console.log("API Error:", error); // Log the error
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Combine Rules</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        {rules.map((rule, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              placeholder="Enter Rule"
              type="text"
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              className="border rounded p-2 w-full mr-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveRule(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRule}
          className="bg-green-500 text-white p-2 rounded mb-4 mr-4"
        >
          Add Rule
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100 max-h-64 overflow-auto">
          {response.Node ? (
            <>
              <h2 className="text-lg font-bold mb-2">AST:</h2>
              <pre>{JSON.stringify(response.Node, null, 2)}</pre>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2">Error:</h2>
              <p className="text-red-500">{response.error}</p>
            </>
          )}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 border rounded bg-red-100 text-red-700">
          <h2 className="text-lg font-bold mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CombineRules;
