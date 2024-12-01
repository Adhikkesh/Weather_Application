# SKAR Weather App

## Project Overview

SKAR Weather App is a dynamic web application that provides real-time weather information for various locations. Built using Node.js, Express, and EJS templating, the app fetches weather data from a third-party API and presents it in an intuitive, visually appealing interface.

## Application Deployment

This application is deployed and hosted on Render. You can access the live version of the app through the following link:

 [Weather Application](https://weather-application-q2mr.onrender.com)

## 🌟 Features

- **Real-time Weather Data**: Fetch current weather conditions for any location
- **Hourly Forecast**: Detailed hourly temperature and condition information
- **Dynamic Background**: Adaptive background images based on current weather
- **Responsive Design**: Mobile and desktop-friendly layout
- **Search Functionality**: Find weather information for any city or country

## 🛠 Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - Axios for API requests
  - dotenv for environment configuration

- **Frontend**:
  - EJS Templating
  - Bootstrap
  - Custom CSS
  - Vanilla JavaScript

- **APIs**:
  - Weather API (for real-time weather data)

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/skar-weather-app.git
cd skar-weather-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
API_URL=https://api.weatherapi.com/v1
API_KEY=your_weather_api_key
```

4. Run the application
```bash
node app.js
```

5. Open your browser and navigate to `http://localhost:3000`

## 🌈 Configuration

### Environment Variables
- `API_URL`: Base URL for the weather API
- `API_KEY`: Your personal API key for weather data
- `PORT`: (Optional) Custom port for the application (default: 3000)

## 📁 Project Structure

```
skar-weather-app/
│
├── public/
│   ├── images/
│   ├── styles/
│   └── script.js
│
├── views/
│   └── index.ejs
│
├── .env
├── app.js
├── package.json
└── README.md
```

## 🎨 Styling and Design

The app features a responsive design with:
- Dynamic background images
- Blur effects
- Gradient backgrounds
- Adaptive color schemes

## 🌐 Weather Condition Categories

The app categorizes weather conditions into:
- Rainy
- Sunny
- Cloudy
- Night

## 🔍 API Integration

Integrates with a weather API to provide:
- Current temperature
- Hourly forecasts
- Astronomical data (sunrise, sunset, moonrise)
- Weather condition icons

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🏷️ Version

Current Version: 1.0.0

## 📞 Contact

Your Name - adhikkesh@example.com

Project Link: [https://github.com/Adhikkesh/Weather_Application](https://github.com/Adhikkesh/Weather_Application)
