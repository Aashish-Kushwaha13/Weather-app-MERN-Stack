import React, { useState } from "react";
import axios from "axios";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import clearIcon from "./assets/clear.png";
import cloudsIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import mistIcon from "./assets/mist.png";
import searchIcon from "./assets/search.png";

const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city.trim()) return alert("Enter a city name!");
        try {
            const response = await axios.get(`https://weather-app-mern-stack-delta.vercel.app/weather/${city}`);
            setWeather(response.data);
            setError("");
        } catch (err) {
            setWeather(null);
            setError("City not found");
        }
    };

    // Function to select weather icon
    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case "Clear":
                return clearIcon;
            case "Clouds":
                return cloudsIcon;
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rainIcon;
            case "Snow":
                return snowIcon;
            case "Mist":
                return mistIcon;
            default:
                return clearIcon;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-8 rounded-xl shadow-lg text-center w-96">
                <h1 className="text-3xl font-bold mb-4">Weather App</h1>
                
                {/* Search Box */}
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchWeather}
                        className="bg-white p-3 rounded-full hover:bg-gray-200 transition-all"
                    >
                        <img src={searchIcon} alt="Search" className="w-6 h-6" />
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-3">{error}</p>}

                {/* Weather Details */}
                {weather && (
                    <div className="mt-5 border p-4 rounded-lg bg-white bg-opacity-10">
                        <h2 className="text-2xl font-semibold">{weather.name}</h2>
                        <img 
                            src={getWeatherIcon(weather.weather[0].main)} 
                            alt="Weather Condition" 
                            className="w-24 h-24 mx-auto mt-3"
                        />
                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-xl">{Math.round(weather.main.temp)}°C</h3>

                            {/* Humidity */}
                            <div className="flex items-center gap-3 mt-2">
                                <img src={humidityIcon} alt="Humidity" className="w-10 h-10" />
                                <p className="text-lg">Humidity: {weather.main.humidity}%</p>
                            </div>

                            {/* Wind Speed */}
                            <div className="flex items-center gap-3 mt-2">
                                <img src={windIcon} alt="Wind Speed" className="w-10 h-10" />
                                <p className="text-lg">Wind Speed: {weather.wind.speed} km/h</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
