import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [names, setNames] = useState([])
  const [searchText, setSearchText] = useState([])
  const [filteredCountries, setFiltered] = useState([])

  const handleFilterChange = (value) => {
    console.log(value);
    setSearchText(value)
    if (!value) {
      setFiltered(names);
    } else {
      setFiltered(names.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      ))
    }
  }

  useEffect(() => {
    console.log('effect begins')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log("promise fulfilled, response data:", response.data)
        setCountries(response.data)
      })
      .catch(error => console.log("Error from useEffect catch:", error))
  }, [])

  const populateCountryNames = () => {
    const countryNames = countries.map(country =>
      country.name.common
    )
    setNames(countryNames);
    setFiltered(countryNames);
  }

  useEffect(() => {
    console.log("useEffect running because countries state changed");
    populateCountryNames();
  },[countries])

  return (
    <div className="App">
      <h1>Know Your Nations</h1>
      <Search searchText={searchText} onChange={handleFilterChange} />
      <Information filteredCountries={filteredCountries} countries={countries} />
    </div>
  );
}

const Search = ({searchText, onChange}) => {
  return (
    <div>Filter Countries: <input 
      type="text" 
      value={searchText} 
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
    return (
    <ViewOneCountry 
      countries={countries}
      filteredCountry={filteredCountries[0]}
    />)
    /*
    console.log("full info on one country", countries)
    let countryInfo = countries.filter(country =>
     country.name.common === filteredCountries[0]
     )
    console.log("country info", countryInfo);
    return (
    <div>
      <h2>{filteredCountries[0]} {countryInfo[0].flag}</h2>
      <img src={countryInfo[0].flags.png} alt="flag image" width="250"/>
      <p>Official Name: {countryInfo[0].name.official}</p>
      <p>Capital City: {countryInfo[0].capital[0]}</p>
      <p>Languages: <ul>{Object.values(countryInfo[0].languages).map(lang =>
          <li>{lang}</li>
        )}</ul></p>
      <p>Region: {countryInfo[0].subregion || countryInfo[0].region}</p>
      <p>Population: {countryInfo[0].population.toLocaleString('en-US')}</p>
      <p>{filteredCountries[0]} is {countryInfo[0].independent ? "independent" : "not independent"
      } and {countryInfo[0].landlocked ? "is landlocked" : "is not landlocked"
      }. It {countryInfo[0].unMember ? "is" : "is not"} a member of the United Nations.
      </p>
      <p>Coat of Arms:</p>
      <img src={countryInfo[0].coatOfArms.png} alt="coat of arms" width="250"/>
      </div>
      )
      */
  } else if (length > 10) {
    return (
      <div>
        <p>Please narrow your search. That's too many countries!</p>
      </div>
      )
  } else
  return (
      <ResultsWithButtons 
        filteredCountries={filteredCountries}
        countries={countries}
        />
    )
}

const ResultsWithButtons = ({filteredCountries, countries}) => {
  const showDetails = (country) => {
    console.log(country.country);
  }
  return (
  <div>
  {filteredCountries.map((country, i) =>
    <div key={i}><p>{country} <button 
      type="button"
      onClick={() => showDetails({country})}
    >Show Details</button></p></div>  
  )}
  </div>
  )
}

const ViewOneCountry = ({countries, filteredCountry}) => {
  console.log("full info on one country", countries)
  let countryInfo = countries.filter(country =>
   country.name.common === filteredCountry
   )
  console.log("country info", countryInfo);

  return (
    <div>
      <h2>{filteredCountry} {countryInfo[0].flag}</h2>
      <img src={countryInfo[0].flags.png} alt="flag image" width="250"/>
      <p>Official Name: {countryInfo[0].name.official}</p>
      <p>Capital City: {countryInfo[0].capital[0]}</p>
      <p>Languages: <ul>{Object.values(countryInfo[0].languages).map(lang =>
          <li>{lang}</li>
        )}</ul></p>
      <p>Region: {countryInfo[0].subregion || countryInfo[0].region}</p>
      <p>Population: {countryInfo[0].population.toLocaleString('en-US')}</p>
      <p>{filteredCountry} is {countryInfo[0].independent ? "independent" : "not independent"
      } and {countryInfo[0].landlocked ? "is landlocked" : "is not landlocked"
      }. It {countryInfo[0].unMember ? "is" : "is not"} a member of the United Nations.
      </p>
      <p>Coat of Arms:</p>
      <img src={countryInfo[0].coatOfArms.png} alt="coat of arms" width="250"/>
      </div>
      )
}

export default App;
