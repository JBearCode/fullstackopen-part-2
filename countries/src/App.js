import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (value) => {
    setFilter(value);
    console.log(value);
    if (!value) {
      setCountries([])
    } else {
      setCountries([])
    }
  }

  return (
    <div className="App">
      <h1>Know Your Nations</h1>
      <Search filterBy={filter} onChange={handleFilterChange} />
    </div>
  );
}

const Search = ({filter, onChange}) => {
  return (
    <div>Filter Countries: <input 
      type="text" 
      value={filter} 
      onChange={(e) => onChange(e.target.value)}
    /></div>
  )
}

export default App;
