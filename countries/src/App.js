import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([]);
  const [names, setNames] = useState([])
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFiltered] = useState([])

  const handleFilterChange = (value) => {
    setFilter(value);
    console.log(value);
    if (!value) {
      setFiltered(names);
    } else {
      let matching = names.filter(country =>
        country.toLowerCase().includes(filter.toLowerCase())
      )
      console.log(matching);
      setFiltered(matching);
    }
  }

  useEffect(() => {
    console.log('effect begins')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
        console.log(countries);
        populateCountryNames();
      })
  }, [])

  function populateCountryNames() {
    const countryNames = countries.map(country =>
      country.name.common
    )
    setNames(countryNames)
    setFiltered(countryNames)
    console.log(countryNames)
  }

  return (
    <div className="App">
      <h1>Know Your Nations</h1>
      <Search filterBy={filter} onChange={handleFilterChange} />
      <Information filteredCountries={filteredCountries} />
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

const Information = ({filteredCountries}) => {
  let length = filteredCountries.length;
  console.log(length);

  if (length === 0) {
    return (
      <div>
        <p>We can't find any countries that match your search.</p>
      </div>
    )
  } else if (length === 1) {
    return (
      <div>
        <p>We've got lots of info on {filteredCountries[0]}!</p>
      </div>
      )
  } else if (length > 10) {
    return (
      <div>
        <p>Please narrow your search. That's too many countries!</p>
      </div>
      )
  } else
  return (
      <div>
        {filteredCountries.map(country =>
          <p>{country}</p>  
        )}
      </div>
    )
}

export default App;
