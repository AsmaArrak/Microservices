const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

// Define your GraphQL schema
const typeDefs = gql`
  type Weather {
    temperature: Float!
    description: String!
    humidity: Float!
    windSpeed: Float!
    # Include other relevant weather data fields
  }

  type Query {
    getWeather(locationId: String!): Weather
  }
`;

// Define your resolver functions
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

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express app
const app = express();

// Integrate Apollo Server with Express
server.applyMiddleware({ app });

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
