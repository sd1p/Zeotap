"use client";
import React, { useState } from "react";
import axios from "axios";
import configAPI from "@/lib/config";

interface ApiResponse {
  result?: boolean;
  error?: string;
}

const EvaluateRule = () => {
  const [ast, setAst] = useState("");
  const [context, setContext] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAstChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAst(e.target.value);
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setResponse(null); // Reset response state

    try {
      const data = JSON.stringify({
        ast: JSON.parse(ast),
        context: JSON.parse(context),
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${configAPI.Task1_API}/api/evaluate_rule`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setResponse(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Failed to evaluate rule.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Evaluate Rule</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="ast" className="block mb-2">
          AST (Abstract Syntax Tree):
        </label>
        <textarea
          id="ast"
          value={ast}
          onChange={handleAstChange}
          className="border rounded p-2 w-full mb-4"
          rows={5}
          placeholder='{"type": "operator", "value": "AND", ...}'
        />
        <label htmlFor="context" className="block mb-2">
          Context (Data):
        </label>
        <textarea
          id="context"
          value={context}
          onChange={handleContextChange}
          className="border rounded p-2 w-full mb-4"
          rows={5}
          placeholder='{"age": 35, "department": "Marketing", ...}'
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100 max-h-64 overflow-auto">
          {response.result !== undefined ? (
            <>
              <h2 className="text-lg font-bold mb-2">Result:</h2>
              <p>{response.result ? "True" : "False"}</p>
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

export default EvaluateRule;
