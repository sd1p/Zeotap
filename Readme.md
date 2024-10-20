Frontend Deployment - <https://zeotap-n29cr3gvo-sud1ps-projects.vercel.app>

Task 1 Backend Docs - <https://task1-backend-283967249469.asia-south1.run.app/docs>

Task 2 Backend  Docs - <https://task2-backend-283967249469.asia-south1.run.app/docs>

# Rule Engine with AST and Real-Time Weather Monitoring System

## Table of Contents

- [Rule Engine with AST and Real-Time Weather Monitoring System](#rule-engine-with-ast-and-real-time-weather-monitoring-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Applications](#applications)
    - [Rule Engine with AST](#rule-engine-with-ast)
      - [Objective](#objective)
      - [Data Structure](#data-structure)
      - [Sample Rules](#sample-rules)
    - [Real-Time Data Processing System for Weather Monitoring](#real-time-data-processing-system-for-weather-monitoring)
      - [Objective](#objective-1)
      - [Data Source](#data-source)
    - [Real-Time Data Processing System for Weather Monitoring](#real-time-data-processing-system-for-weather-monitoring-1)
      - [Objective](#objective-2)
      - [Data Source](#data-source-1)
      - [Rollups and Aggregates](#rollups-and-aggregates)
  - [Build Instructions](#build-instructions)
    - [Task 1: Rule Engine with AST](#task-1-rule-engine-with-ast)
    - [Task 2: Real-Time Data Processing System for Weather Monitoring](#task-2-real-time-data-processing-system-for-weather-monitoring)
  - [Dependencies](#dependencies)
  - [API Endpoints](#api-endpoints)
    - [Rule Engine](#rule-engine)
    - [Weather Monitoring](#weather-monitoring)
  - [Database Schema](#database-schema)
    - [Rule Engine](#rule-engine-1)
    - [Weather Monitoring](#weather-monitoring-1)
  - [Test Cases](#test-cases)
    - [Rule Engine](#rule-engine-2)
    - [Weather Monitoring](#weather-monitoring-2)
  - [Design Choices](#design-choices)
  - [Additional Features](#additional-features)
  - [Conclusion](#conclusion)

## Introduction

This project consists of two main applications:

1. A Rule Engine with Abstract Syntax Tree (AST) for determining user eligibility based on attributes.
2. A Real-Time Data Processing System for Weather Monitoring with rollups and aggregates.

## Applications

### Rule Engine with AST

#### Objective

Develop a 3-tier rule engine application to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses AST to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

#### Data Structure

The AST is represented using a Node data structure with the following fields:

- `type`: String indicating the node type ("operator" for AND/OR, "operand" for conditions)
- `left`: Reference to another Node (left child)
- `right`: Reference to another Node (right child for operators)
- `value`: Optional value for operand nodes (e.g., number for comparisons)

#### Sample Rules

- `rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"`

- `rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"`

### Real-Time Data Processing System for Weather Monitoring

#### Objective

Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves data from the OpenWeatherMap API.

#### Data Source

The system continuously retrieves weather data from the OpenWeatherMap API for metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).

### Real-Time Data Processing System for Weather Monitoring

#### Objective

Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves data from the OpenWeatherMap API.

#### Data Source

The system continuously retrieves weather data from the OpenWeatherMap API for metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).

#### Rollups and Aggregates

1. **Daily Weather Summary**:
   - Calculate daily aggregates for average temperature, maximum temperature, minimum temperature, and dominant weather condition.
   - Store daily summaries in a database.
   - Cron jobs are used for the retrieval of weather data and aggregation at midnight.

2. **Alerting Thresholds**:
   - Define user-configurable thresholds for temperature or specific weather conditions.
   - Trigger alerts if thresholds are breached.

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
    uvicorn main:app --reload
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
    uvicorn main:app --reload
    ```

4. Set up the frontend:

        ```sh
        cd frontend
        npm install
        ```

5. Run the frontend server:

    ```sh
    npm run dev
    ```

## Dependencies

- **Backend**:
  - Python 3.8+
  - FastAPI
  - SQLAlchemy
  - Uvicorn
  - Pydantic
  - OpenWeatherMap API Key

- **Frontend**:
  - Node.js 14+
  - React
  - Next.js
  - Axios

## API Endpoints

### Rule Engine

- `POST /api/create_rule`: Create a rule and return its AST.
- `POST /api/combine_rules`: Combine multiple rules into a single AST.
- `POST /api/evaluate_rule`: Evaluate a rule against provided data.

### Weather Monitoring

- `GET /api/weather/daily_summary/{location}`: Get daily weather summary for a location.

## Database Schema

### Rule Engine

- `rules`:
  - `id`: Integer, Primary Key
  - `rule_string`: String
  - `ast`: JSON

### Weather Monitoring

- `daily_weather_summary`:
  - `id`: Integer, Primary Key
  - `city`: String
  - `date`: Date
  - `avg_temp`: Float
  - `max_temp`: Float
  - `min_temp`: Float
  - `dominant_condition`: String

## Test Cases

### Rule Engine

1. Create individual rules using `create_rule` and verify their AST representation.
2. Combine rules using `combine_rules` and ensure the resulting AST reflects the combined logic.
3. Test `evaluate_rule` with sample JSON data for different scenarios.

### Weather Monitoring

1. Verify system starts and connects to the OpenWeatherMap API.
2. Simulate API calls and ensure correct data retrieval and parsing.
3. Test temperature conversion from Kelvin to Celsius.
4. Verify daily summaries and alerting thresholds.

## Design Choices

- **Rule Engine**: Used AST for flexible and dynamic rule representation. Chose FastAPI for its performance and ease of use.
- **Weather Monitoring**: Used OpenWeatherMap API for reliable weather data. Chose Next.js for server-side rendering and React for the frontend.

## Additional Features

- Error handling for invalid rule strings or data formats.
- Validations for attributes to be part of a catalog.
- Modification of existing rules.
- User-defined functions within the rule language for advanced conditions.
- Support for additional weather parameters and forecasts.

## Conclusion

This project demonstrates a comprehensive approach to building a rule engine with AST and a real-time weather monitoring system. The design choices and implementation details ensure flexibility, scalability, and maintainability.
