import { useState } from "react";
import { Search } from "./components/Search";

import './App.css';
import { createMockServer } from './createMockServer';

if(process.env.NODE_ENV === 'development'){
  createMockServer();
}

function App() {

  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
      <Search selected={selected} setSelected={setSelected}/>
      <div data-testid="my-weather-list">
        {selected && selected.map((city) => (
          <div key={`${city.lat}-${city.lon}`}>
            {city.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
