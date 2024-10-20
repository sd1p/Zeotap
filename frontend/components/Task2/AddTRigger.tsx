import axios from "axios";
import config from "@/lib/config";
interface AddTriggerProps {
  location: string;
  onTriggerAdded: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  temperatureThreshold: number;
  setTemperatureThreshold: React.Dispatch<React.SetStateAction<number>>;
  temperatureAbove: boolean;
  setTemperatureAbove: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AddTrigger = ({
  location,
  onTriggerAdded,
  email,
  setEmail,
  temperatureThreshold,
  setTemperatureThreshold,
  temperatureAbove,
  setTemperatureAbove,
  setError,
}: AddTriggerProps) => {
  const handleAddTrigger = async () => {
    const data = {
      user_email: email,
      city: location,
      temperature_above: temperatureAbove,
      temperature_threshold: temperatureThreshold,
    };

    try {
      await axios.post(`${config.Task2_API}/api/alerts/`, data);
      onTriggerAdded();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Failed to create trigger");
      }
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold">Add Trigger</h3>
      <div className="flex flex-col mb-2">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="threshold">Temperature Threshold:</label>
        <input
          id="threshold"
          type="number"
          value={temperatureThreshold}
          onChange={(e) => setTemperatureThreshold(Number(e.target.value))}
          className="border p-2"
        />
      </div>
      <div className="flex items-center mb-2">
        <label htmlFor="temperatureAbove" className="mr-2">
          Trigger When Temperature:
        </label>
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            id="temperatureAbove"
            type="checkbox"
            checked={temperatureAbove}
            onChange={() => setTemperatureAbove(!temperatureAbove)}
            className="toggle-checkbox hidden"
          />
          <label
            htmlFor="temperatureAbove"
            className={`toggle-label block h-6 rounded-full cursor-pointer ${
              temperatureAbove ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></label>
          <span
            role="button"
            aria-label="Toggle temperature above"
            aria-pressed={temperatureAbove ? "true" : "false"}
            tabIndex={0}
            onClick={() => setTemperatureAbove(!temperatureAbove)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setTemperatureAbove(!temperatureAbove);
              }
            }}
            className={`absolute left-0 top-0 h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in ${
              temperatureAbove ? "translate-x-full" : ""
            }`}
          ></span>
        </div>
        <span>{temperatureAbove ? "Above" : "Below"}</span>
      </div>

      <button
        onClick={handleAddTrigger}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Trigger
      </button>
    </div>
  );
};

export default AddTrigger;
