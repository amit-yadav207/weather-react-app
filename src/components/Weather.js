// Weather.js
import React from 'react';

function Weather({ data, city }) {
    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2); // Conversion from Kelvin to Celsius
    }

    return (
        <div className="weather-info">
            <h2>Weather in {city}</h2>
            <p>Temperature: {kelvinToCelsius(data.main.temp)} °C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Weather: {data.weather[0].main}</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
            />
        </div>
    );
}

export default Weather;
