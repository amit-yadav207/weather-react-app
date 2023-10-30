// App.js
import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [region, setRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWeatherData = async () => {
    const API_KEY = 'd15487d4b5c1617e2ca2b36c1ce1e816';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert('City not found. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter a city/country name.');
      return;
    }
    fetchWeatherData();
    setRegion(searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1));
    setSearchQuery('');
  }

  return (
    <div className="App">
      <header>
        <h1>Weather App <i className="fas fa-cloud-sun"></i></h1>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city/country name"
            name="inputField"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-button">
            Search <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      {weatherData && weatherData.cod === 200 ? (
        <div>
          <Weather data={weatherData} city={region} />
        </div>
      ) : (
        <p className='blank'>Enter a location to get weather information</p>
      )}
    </div>
  );
}

export default App;
