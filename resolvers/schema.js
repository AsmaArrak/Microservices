const { gql } = require('@apollo/server');

const typeDefs = gql`
  type Weather {
    temperature: Float
    description: String
    humidity: Float
    windSpeed: Float
    # Add other relevant weather fields
  }

  type Query {
    getWeather(locationId: String!): Weather
  }
`;

module.exports = typeDefs;
