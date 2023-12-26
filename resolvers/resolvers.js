const axios = require('axios');

const resolvers = {
  Query: {
    getWeather: async (parent, args) => {
      const locationId = args.locationId;
      
      try {
        // Make a request to the weather API to fetch weather data based on the location ID
        const weatherData = await axios.get(`https://api.weatherprovider.com/weather/${locationId}`);
        
        // Extract the relevant weather data fields from the API response
        const { temperature, description, humidity, windSpeed } = weatherData.data;
        
        // Create a Weather object with the retrieved data
        const weather = {
          temperature,
          description,
          humidity,
          windSpeed,
          // Include other relevant weather data fields
        };
        
        return weather;
      } catch (error) {
        console.error('Error retrieving weather data:', error);
        throw new Error('Failed to retrieve weather data');
      }
    },
  },
};

module.exports = resolvers;
