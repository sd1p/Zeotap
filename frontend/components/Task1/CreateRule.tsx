"use client";
import React, { useState } from "react";
import axios from "axios";
import configAPI from "@/lib/config";

interface ApiResponse {
  Node?: object;
  error?: string;
}

const CreateRule = () => {
  const [ruleString, setRuleString] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleString(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const data = JSON.stringify({ rule_string: ruleString });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${configAPI.Task1_API}/api/create_rule`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      setResponse(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Rule (Validate Rule)</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="ruleString" className="block mb-2">
          Rule String:
        </label>
        <input
          type="text"
          id="ruleString"
          value={ruleString}
          onChange={handleInputChange}
          className="border rounded p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100 max-h-64 overflow-auto">
          {response.Node ? (
            <>
              <h2 className="text-lg font-bold mb-2">Node:</h2>
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

export default CreateRule;
