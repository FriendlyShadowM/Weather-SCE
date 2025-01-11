import React, { useState } from 'react' // Import React and the useState hook

const App = () => {
  // Declare state variables
  const [zipCode, setZipCode] = useState('') // State for storing the zip code input by the user
  const [weatherData, setWeatherData] = useState(null) // State for storing the fetched weather data
  const [error, setError] = useState(null) // State for storing any error messages

  const apiKey = '384530a26df84465ffe7e9419c8e' // API key for accessing the weather data

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    setError(null) // Reset any previous error messages
    setWeatherData(null) // Reset any previous weather data
  
    try {
      // Fetch weather data from the API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data') // Throw an error if the response is not ok
      }
      const data = await response.json() // Parse the response data as JSON
      setWeatherData(data) // Update the weatherData state with the fetched data
    } catch (error) {
      setError(error.message) // Update the error state with the error message
    }
  }

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zipCode} // Bind the input value to the zipCode state
          onChange={(e) => setZipCode(e.target.value)} // Update the zipCode state when the input value changes
          placeholder="Enter zip code" // Placeholder text for the input field
          />
          <button type="submit">Get Weather</button> // Button to submit the form
      </form>
      {error && <p>{error}</p>} // Display error message if there is an error
      {weatherData && ( // Display weather data if it is available
        <div>
          <h2>{weatherData.name}</h2> // Display the name of the location
          <p>Temperature: {weatherData.main.temp} °F</p> // Display the temperature in Fahrenheit
        </div>
      )}
    </div>
  )
}

export default App