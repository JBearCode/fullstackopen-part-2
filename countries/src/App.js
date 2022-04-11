import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [names, setNames] = useState([])
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFiltered] = useState([])
  let responseData;

  const handleFilterChange = (value) => {
    setFilter(value);
    if (!value) {
      setFiltered(names);
    } else {
      setFiltered(names.filter(country =>
        country.toLowerCase().includes(filter.toLowerCase())
      ))
    }
  }

  useEffect(() => {
    console.log('effect begins')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        responseData = response.data
        console.log('response.data', responseData)
        setCountries(responseData)
        console.log("countries array", countries);
        populateCountryNames();
      })
  }, [])

  function populateCountryNames() {
    const countryNames = countries.map(country =>
      country.name.common
    )
    setNames(countryNames)
    setFiltered(countryNames)
  }

  return (
    <div className="App">
      <h1>Know Your Nations</h1>
      <Search filterBy={filter} onChange={handleFilterChange} />
      <Information filteredCountries={filteredCountries} countries={countries} />
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

const Information = ({filteredCountries, countries}) => {
  let length = filteredCountries.length;
  console.log("filtered countries arriving in Information component", length);

  if (length === 0) {
    return (
      <div>
        <p>We can't find any countries that match your search.</p>
      </div>
    )
  } else if (length === 1) {
    console.log("full info on one country", countries)
    let countryInfo = countries.filter(country =>
     country.name.common === filteredCountries[0]
     )
    console.log("country info", countryInfo);


    return (
    <div>
      <h2>{filteredCountries[0]} {countryInfo[0].flag}</h2>
      <p>We've got lots of info on {filteredCountries[0]}!</p>
      {/*
      */}
      <img src={countryInfo[0].flags.png} alt="flag image" width="250"/>
      <p>Official Name: {countryInfo[0].name.official}</p>
      <p>Region: {countryInfo[0].subregion}</p>
      <p>Population: {countryInfo[0].population}</p>
      <p>Coat of Arms:</p>
      <img src={countryInfo[0].coatOfArms.png} alt="coat of arms" width="250"/>
      <p>Capital City: {countryInfo[0].capital[0]}</p>
      <p>{filteredCountries[0]} is {countryInfo[0].independent ? "independent" : "not independent"
      } and {countryInfo[0].landlocked ? "is landlocked" : "is not landlocked"
      }. It {countryInfo[0].unMember ? "is" : "is not"} a member of the United Nations.
      
      </p>
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
        {filteredCountries.map((country, i) =>
          <p key={i}>{country}</p>  
        )}
      </div>
    )
}

export default App;
