
import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function RecentSearch({ data, region }) {
  if (data && data.cod === 200) {
    return (
      <div>
        <Weather data={data} city={region} />
      </div>
    );
  } else {
    return <p className='blank'>Enter a location to get weather information</p>;
  }
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [region, setRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchWeatherData = async (location) => {
    const API_KEY = 'd15487d4b5c1617e2ca2b36c1ce1e816';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

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
    const formattedSearchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    setRegion(formattedSearchQuery);

    // Check if the location is already in the recent searches
    if (!recentSearches.includes(formattedSearchQuery)) {
      fetchWeatherData(formattedSearchQuery); // Only fetch data if it's not in recent searches
      setRecentSearches((prevSearches) => [formattedSearchQuery, ...prevSearches.slice(0, 3)]);
    }

    setSearchQuery('');
  }

  const handleRecentSearchClick = (search) => {
    fetchWeatherData(search);
    setRegion(search);
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className={`${isDarkMode ? 'dark-mode' : ''}`}>
        <h1>Weather App <i className="fas fa-cloud-sun"></i></h1>
        {isDarkMode ? (
          <i className="fas fa-sun" onClick={toggleDarkMode}></i>
        ) : (
          <i className="fas fa-moon" onClick={toggleDarkMode}></i>
        )}
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
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h2>Recent Searches:</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleRecentSearchClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
      <RecentSearch data={weatherData} region={region} />
    </div>
  );
}

export default App;


