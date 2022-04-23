import { useState, useEffect, useCallback, useRef } from 'react'
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

  const wrapperSetFiltered = useCallback(val => {
    setFiltered(val)
  }, [setFiltered])

  return (
    <div className="App">
      <h1>Know Your Nations</h1>
      <Search searchText={searchText} onChange={handleFilterChange} />
      <Information filteredCountries={filteredCountries} countries={countries}
      wrapperSetFiltered={wrapperSetFiltered} />
    </div>
  );
}

const Search = ({searchText, onChange}) => {
  return (
    <div>Enter Country Name: <input 
      type="text" 
      value={searchText} 
      onChange={(e) => onChange(e.target.value)}
    /></div>
  )
}

const Information = ({filteredCountries, countries, wrapperSetFiltered}) => {
  let length = filteredCountries.length;
  console.log("filtered countries arriving in Information component", length);

  const childRef = useRef();
  const [childState, setChildState] = useState([]);

  useEffect(() => {
    wrapperSetFiltered(childState)
  }, [wrapperSetFiltered, childState])

  const showDetails = (country) => {
    console.log(country.country);
    setChildState([country.country]);
  }

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
    />
    )
  } else if (length > 10) {
    return (
      <div>
        <p>Please narrow your search. That's too many countries!</p>
      </div>
      )
  } else return (
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
  const [cityWeather, setCityWeather] = useState([])
  const [weatherImg, setWeatherImg] = useState('')

  console.log("full info on one country", countries)
  let countryInfo = countries.filter(country =>
   country.name.common === filteredCountry
   )
  console.log("country info", countryInfo);

  // call weather API
  const weatherKey = process.env.REACT_APP_API_KEY;
  
  useEffect(() => {
    console.log('calling weather API')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryInfo[0].latlng[0]}&lon=${countryInfo[0].latlng[1]}&appid=${weatherKey}&units=imperial`)
      .then(response => {
        console.log("promise fulfilled, response data:", response.data)
        setCityWeather(response.data)
      })
      .catch(error => console.log("Error from useEffect catch:", error))
  }, [])  

  useEffect(() => {
    console.log("useEffect running because cityWeather state changed", cityWeather);
    if (Object.keys(cityWeather).length > 2) {
      setWeatherImg("http://openweathermap.org/img/wn/" + cityWeather.weather[0].icon + "@2x.png")
    }
  },[cityWeather])

  return (
    <div>
      <div className="countryDiv">
        <h2>{filteredCountry} {countryInfo[0].flag}</h2>
        <img src={countryInfo[0].flags.png} alt="flag image" width="250"/>
        <p>Official Name: {countryInfo[0].name.official}</p>
        <p>Capital City: {countryInfo[0].capital[0]}</p>
        <div><p>Languages: </p><ul>{Object.values(countryInfo[0].languages).map(lang =>
            <li key={lang}>{lang}</li>
          )}</ul></div>
        <p>Region: {countryInfo[0].subregion || countryInfo[0].region}</p>
        <p>Population: {countryInfo[0].population.toLocaleString('en-US')}</p>
        <p>{filteredCountry} is {countryInfo[0].independent ? "independent" : "not independent"
        } and {countryInfo[0].landlocked ? "is landlocked" : "is not landlocked"
        }. It {countryInfo[0].unMember ? "is" : "is not"} a member of the United Nations.
        </p>
        <p>Coat of Arms:</p>
        <img src={countryInfo[0].coatOfArms.png} alt="coat of arms" width="250"/>
      </div>
      <div className="weatherDiv">
        <h2>Current Weather in {countryInfo[0].capital[0]}</h2>
        {Object.keys(cityWeather).length > 2 &&
        <div>
          <img alt="weather icon" src={weatherImg} />
          <p>Weather: {cityWeather.weather[0].description}</p>
          <p>Temperature: {cityWeather.main.temp}°F</p>
          <p>Humidity: {cityWeather.main.humidity}%</p>
          <p>Wind: {cityWeather.wind.speed} miles/hour</p>
        </div>
        }
      </div>
    </div>
      )
}

export default App;
