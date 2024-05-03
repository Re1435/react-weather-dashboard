import React, { useState } from 'react'
import clearIcon from '../assets/Assets/clear.png'
import humidityIcon from '../assets/Assets/humidity.png'
import windIcon from '../assets/Assets/wind.png'
import searchIcon from '../assets/Assets/search.png'
import './weather.css'

const Weather = () => {
  const [searchVal, setSearchVal] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchApiData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=Metric&appid=a8f96971d73d97d442e93a0e4f226a43`
      )
      if (!response.ok) {
        throw new Error('City not found')
      }
      const responseData = await response.json()
      setData(responseData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const searchCity = () => {
    fetchApiData()
    setSearchVal('')
  }

  let weatherIcon = clearIcon
  // if (data.weather[0].icon === '01d') {
  //   weatherIcon = clearIcon
  // } else if (data.weather[0].icon === '04d') {
  //   weatherIcon = cloudIcon
  // } else if (data.weather[0].icon === '03d') {
  //   weatherIcon = snowIcon
  // } else if (data.weather[0].icon === '09d') {
  //   weatherIcon = drizzleIcon
  // } else {
  //   weatherIcon = rainIcon
  // }

  return (
    <>
      <h1>Weather Dashboard</h1>
      <div className="search-container">
        <input
          type="search"
          placeholder="Enter the city name"
          className="search-bar"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <img src={searchIcon} alt="search-icon" onClick={searchCity} />
      </div>

      <div className="dashboard">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data ? (
          <>
            <div className="weather-icon-container">
              <h5> {data.weather[0].main}</h5>
              <img src={weatherIcon} alt="weather-icon" />
            </div>

            <hr />

            <div className="weather-info-container">
              <h3>{data.name}</h3>
              <h3>{data.main.temp}°C</h3>
              <div className="weather-info-icons">
                <div>
                  <img src={humidityIcon} alt="humidity-icon" />
                  <h3>Humidity: {data.main.humidity}%</h3>
                </div>
                <div>
                  <img src={windIcon} alt="wind-icon" />
                  <h3>Wind Speed: {data.wind.speed} m/s</h3>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2>Search weather in your favourite city...</h2>
        )}
      </div>
    </>
  )
}

export default Weather
