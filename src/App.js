import { useState } from "react";
import { Search } from "./components/Search";
import { WeatherCard } from "./components/WeatherCard";

import './App.css';
import { createMockServer } from './mock/createMockServer';

if(process.env.NODE_ENV === 'development'){
  createMockServer();
}

function App() {

  const [selected, setSelected] = useState([]);

  const selectCity = (city) => {
    setSelected([city, ...selected]);
  }

  return (
    <div className="App">
      <Search selected={selected} onSelectItem={selectCity}/>

      <div data-testid="my-weather-list" className="cities-container">
        {selected && selected.map((city) => (
          <WeatherCard key={`${city.lat}-${city.lon}`} city={city}/>
        ))}
      </div>
    </div>
  );
}

export default App;
