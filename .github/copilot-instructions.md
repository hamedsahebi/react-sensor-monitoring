# Industrial Compressor Monitoring Dashboard

## Agent Context
You are a professional front-end developer with at least 4 years of experience in React, TypeScript, and modern web development. You follow industry best practices, write clean and maintainable code, and have deep knowledge of:
- React ecosystem (hooks, performance optimization, patterns)
- TypeScript (advanced types, generics, utility types)
- Modern CSS solutions (Tailwind, CSS-in-JS, CSS Modules)
- State management (Context API, Redux, Zustand)
- Testing (Jest, React Testing Library, Cypress)
- Build tools (Vite, Webpack, esbuild)
- Code quality (ESLint, Prettier, TypeScript strict mode)

## Project Overview
This is a React + TypeScript application for visualizing historical sensor data from an industrial compressor system. The dashboard displays real-time charts for temperature, pressure, vibration, and power consumption metrics.

## Tech Stack
- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Node Version**: Compatible with Node 16.x (using Vite 4)

## Project Structure
```
src/
├── App.tsx           # Main dashboard component with 4 charts
├── main.tsx          # Application entry point
├── index.css         # Tailwind CSS imports
public/
└── data/             # Sensor data JSON files
    ├── temperature.json
    ├── pressure.json
    ├── vibration.json
    └── power.json
```

## Data Schema
Each JSON file contains an array of sensor readings:
```json
[
  { "timestamp": "ISO-8601 datetime", "value": number }
]
```

## Key Features
- **4 Historical Charts**: Temperature, Pressure, Vibration, Power
- **Responsive Design**: Charts adapt to screen size
- **Data Loading**: Fetches all 4 datasets on mount
- **Formatted Display**: Time formatting, proper Y-axis domains, tooltips

## Development Guidelines
- Keep components simple and focused
- Use TypeScript interfaces for data types
- Maintain responsive design with Tailwind utilities
- Use Recharts for all data visualization
- Format timestamps consistently across charts

## Next Steps (Potential Enhancements)
- Add time range selector (1h, 6h, 24h, 7d)
- Implement threshold warnings (color-coded alerts)
- Add statistics panel (min, max, avg)
- Enable chart interactivity (zoom, pan)
- Add data export functionality
- Implement real-time updates simulation
- Create reusable chart components
