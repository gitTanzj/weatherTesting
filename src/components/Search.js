import React, { useState } from 'react'
import './Search.css';

export const Search = ({ selected, setSelected }) => {

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const buttonClickHandler = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
    .then((result) => {
      return result.json()
    })
    .then((cities) => {
      setSearchResults(cities.map((city) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      })))
    })
  }

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSelectItem = (city) => {
    setSelected([city, ...selected]);
  }

  const onSelect = (city) => {
    onSelectItem(city);
    setSearchResults([]);
  }

  return (
    <div className="search-container">
      <div className="input-container">
        <h1>Weather Application</h1>
        <input type="text" data-testid="search-input" onChange={inputChangeHandler}/>
        <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>    

        {searchResults.length > 0 && 
          <div data-testid="search-results" className="search-results">
              {searchResults.map((city) => 
                <div
                  key={`${city.lat}-${city.lon}`}
                  onClick={() => onSelect(city)}
                  className='search-result'
                >
                  <span className="city-name">{city.name}</span>
                  <span className="city-location">{city.lat}, {city.lon}</span>
                </div>
              )}  
          </div>
        } 
      </div>
    </div>  
  )
}
