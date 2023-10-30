import React, { useState, useEffect } from 'react';
import './App.css';
import RecentSearch from './components/RecentSearch';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [region, setRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches')) || []);
  const [error, setError] = useState(null); // State for error message

  // Save recent searches to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

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
        setError(null); // Clear any previous errors
      } else {
        setError('City not found. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      setError('An error occurred. Please try again later.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setError('Please enter a city/country name.');
      return;
    }
    const formattedSearchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

    if (!recentSearches.includes(formattedSearchQuery)) {
      setRecentSearches((prevSearches) => [formattedSearchQuery, ...prevSearches.slice(0, 3)]);
    }
    setRegion(formattedSearchQuery);
    setSearchQuery('');
    fetchWeatherData(formattedSearchQuery);
  }

  const handleRecentSearchClick = (search) => {
    fetchWeatherData(search);
    setRegion(search);
  }

  // Handle double-click to remove recent search
  const handleRecentSearchDoubleClick = (search) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
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
        {error && <p className="error">{error}</p>}
      </div>
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h2>Recent Searches:</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => handleRecentSearchClick(search)}
                onDoubleClick={() => handleRecentSearchDoubleClick(search)}
              >
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
