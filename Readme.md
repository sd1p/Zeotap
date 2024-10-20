
# Rule Engine with AST and Real-Time Weather Monitoring System

## Deployment

- **Frontend Deployment**: [zeotap-app.vercel.app](https://zeotap-app.vercel.app/)
- **Task 1 Backend Docs**: [Task 1 API Documentation](https://task1-backend-283967249469.asia-south1.run.app/docs)
- **Task 2 Backend Docs**: [Task 2 API Documentation](https://task2-backend-283967249469.asia-south1.run.app/docs)

---

## Introduction

This project consists of two main applications:

1. **Rule Engine with Abstract Syntax Tree (AST)** for determining user eligibility based on attributes.
2. **Real-Time Data Processing System for Weather Monitoring** with rollups and aggregates.

---

## Applications

### Rule Engine with AST

#### Objective

Develop a 3-tier rule engine application to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses AST to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

#### Data Structure

The AST is represented using a Node data structure with the following fields:

- `type`: String indicating the node type (e.g., "operator" for AND/OR, "operand" for conditions).
- `left`: Reference to another Node (left child).
- `right`: Reference to another Node (right child for operators).
- `value`: Optional value for operand nodes (e.g., number for comparisons).

#### Sample Rules

- `rule1`: `"((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"`
- `rule2`: `"((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"`

#### Technologies Used

- **Backend**: FastAPI for high-performance API development.
- **Frontend**: React for an interactive user interface.

#### Design Choices

- Core logic is implemted in python for simplicity and performance.
- Client server architecture is used to for simpler build and deployment.
- Node Class is used to represent the AST. This allows for easy manipulation and evaluation of the rules.
- The AST is created by parsing the input string using a recursive descent parser.
- The AST is evaluated using a recursive function that traverses the tree and evaluates the conditions.

---

### Real-Time Data Processing System for Weather Monitoring

#### Objective

Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves data from the OpenWeatherMap API.

#### Data Source

The system continuously retrieves weather data from the OpenWeatherMap API for metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).

#### Rollups and Aggregates

1. **Daily Weather Summary**:
   - Calculate daily aggregates for average temperature, maximum temperature, minimum temperature, and dominant weather condition.
   - Store daily summaries in a database.
   - Cron jobs retrieve weather data and perform aggregation at midnight.

2. **Alerting Thresholds**:
   - Define user-configurable thresholds for temperature or specific weather conditions.
   - Trigger alerts if thresholds are breached.

#### Technologies Used

- **Backend**: FastAPI for high-performance API development.
- **Frontend**: React for an interactive user interface.

#### Design Choices

- Fast API is used for simplicity.
- Cronjobs are used to fetch weather data and calculate daily summaries.
- Fetching weather data is done using the OpenWeatherMap API every 5 minutes.
- Daily summaries are calculated at midnight (24h) and stored in the database.
- Alerts are triggered when the current weather data breaches temperature thresholds.

---

## Build Instructions

### Task 1: Rule Engine with AST

1. Clone the repository:

    ```sh
    git clone https://github.com/sd1p/Zeotap.git
    cd Zeotap/Task1/Backend
    ```

2. Set up the backend:

    ```sh
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Run the backend server:

    ```sh
    uvicorn main:app --reload --port 8000
    ```

4. Run the tests:

    ```sh
    python -m unittest discover -s tests
    ```

### Task 2: Real-Time Data Processing System for Weather Monitoring

1. Clone the repository:

    ```sh
    git clone https://github.com/sd1p/Zeotap.git
    cd Zeotap/Task2/backend
    ```

2. Set up the backend:

    ```sh
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Run the backend server:

    ```sh
    uvicorn main:app --reload  --port 8080
    ```

### Set up the frontend

1. Install the dependencies:

    ```sh
    cd frontend
    npm install
    ```

2. Set up the environment variables:

   - Create a `.env.local` file in the `frontend` directory.
   - Add the following environment variables:

     ```env
     NEXT_PUBLIC_Task1_API=http://localhost:8000
     NEXT_PUBLIC_Task2_API=http://localhost:8080
     ```

3. Run the frontend server:

    ```sh
    npm run dev
    ```

---

## Dependencies

### Backend

- Python
- FastAPI
- SQLAlchemy
- Uvicorn
- Pydantic
- OpenWeatherMap API Key

### Frontend

- Node.js 20+
- React
- Next.js 14
- Axios

---

## API Endpoints

### Rule Engine

- **Documentation**: [Task 1 API Documentation](https://task1-backend-283967249469.asia-south1.run.app/docs)
- `POST /api/create_rule`: Create a rule and return its AST.
- `POST /api/combine_rules`: Combine multiple rules into a single AST.
- `POST /api/evaluate_rule`: Evaluate a rule against provided data.

### Weather Monitoring

- **Documentation**: [Task 2 API Documentation](https://task2-backend-283967249469.asia-south1.run.app/docs)
- `GET /api/weather/current/{city}`: Get current weather data for a city.
- `GET /api/weather/daily_summary/{city}`: Get daily weather summary for a city.
- `POST /api/alerts`: Create a new weather alert.
- `GET /api/alerts/{city}`: Get all alerts for a city.
- `GET /api/weather/fetch`: Trigger weather data fetch and store operation.
- `GET /api/weather/calculate_summary`: Trigger calculation of today's weather summary.

---

## Database Schema

### Weather Monitoring

- `daily_weather_summary`:
  - `id`: Integer, Primary Key
  - `city`: String
  - `date`: Date
  - `avg_temp`: Float
  - `max_temp`: Float
  - `min_temp`: Float
  - `dominant_condition`: String

- `alerts`:
  - `id`: Integer, Primary Key, Auto Increment
  - `city`: String, Not Null
  - `condition`: String, Not Null
  - `threshold`: Float, Not Null
  - `current_value`: Float, Not Null
  - `timestamp`: DateTime, Not Null
  - `user_email`: String, Nullable

- `user_alerts`:
  - `id`: Integer, Primary Key, Auto Increment
  - `user_email`: String, Nullable
  - `city`: String, Not Null
  - `temperature_above`: Boolean, Not Null
  - `temperature_threshold`: Float, Nullable
  - `active`: Boolean, Default True

- `weather_data`:
  - `id`: Integer, Primary Key, Auto Increment
  - `city`: String, Not Null
  - `main`: String, Not Null
  - `temp`: Float, Not Null
  - `feels_like`: Float, Not Null
  - `humidity`: Float, Not Null
  - `dt`: Integer, Not Null

---

## Test Cases

### Rule Engine

1. **Create individual rules using `create_rule`**:
   - **Test**: `test_create_rule`
   - **Description**: Verifies that `create_rule` correctly parses a rule string into its AST representation.

2. **Combine rules using `combine_rules`**:
   - **Test**: `test_combine_rules`
   - **Description**: Verifies that `combine_rules` correctly combines multiple rule strings into a single AST.

3. **Evaluate rule using `evaluate_rule`**:
   - **Test**: `test_evaluate_rule`
   - **Description**: Verifies that `evaluate_rule` correctly evaluates an AST against provided context data.

### Weather Monitoring

1. Verify system starts and connects to the OpenWeatherMap API.
2. Simulate API calls and ensure correct data retrieval and parsing.
3. Test temperature conversion from Kelvin to Celsius.
4. Verify daily summaries and alerting thresholds.
