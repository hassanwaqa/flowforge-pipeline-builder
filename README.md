# FlowForge – Visual Pipeline Builder

FlowForge is a React and FastAPI-based visual pipeline builder.

## Features

- Reusable node abstraction for building pipeline nodes efficiently
- Five custom nodes demonstrating the abstraction
- Styled node-based workflow interface
- Dynamic Text node resizing
- Variable detection using `{{ variableName }}`
- Dynamic handles generated from text variables
- Backend integration with FastAPI
- Pipeline parsing endpoint that returns:
  - number of nodes
  - number of edges
  - whether the pipeline is a DAG

## Tech Stack

- React
- React Flow
- JavaScript
- FastAPI
- Python

## Prerequisites

- Node.js 18+ for the React frontend
- npm 9+ for frontend dependency installation and scripts
- Python 3.10+ for the FastAPI backend
- pip for installing Python backend dependencies

## Local Development Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Running the Frontend

```bash
cd frontend
npm install
npm start
```

## Running the Backend

```bash
cd backend
uvicorn main:app --reload
```

## Backend Endpoints

- POST /pipelines/parse

## Response Format

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Project Purpose

This project demonstrates frontend component abstraction, dynamic UI logic, graph validation, and frontend-backend integration.
