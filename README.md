# Microservices 👨🏻‍💻

GENERAL IDEA: Weather Forecast Application

Description: Develop a weather forecast application that provides users with current weather information for different locations. The application will utilize both REST and graphql architectures to deliver weather data efficiently.

 By combining REST and GraphQL in my application, I have leveraged the strengths of each approach. RESTful endpoints handle user authentication, while GraphQL provides a more efficient and flexible way to retrieve weather data. This combination allows you to benefit from the simplicity and scalability of REST and the efficient data retrieval and strong typing capabilities of GraphQL.


    
   REST:
    
        👍Benefits:

                  Simplicity: REST follows clear principles and conventions, making API design and development straightforward.
                  Scalability: RESTful APIs can scale well due to their adherence to web architecture principles like caching and load distribution.
                  Compatibility: REST APIs can be consumed by a wide range of clients, including web browsers, mobile apps, and other web services.


                  
       👎 Drawbacks:
       

                  Data Overfetching: REST clients may retrieve redundant or unnecessary data since responses are pre-defined by the servers.
                  Request Overhead: REST clients may need to perform multiple requests to fetch complex or nested data.

                  
   
                    

                         
   GraphQL:

   
        👍Benefits:
        
                  Efficient Queries: GraphQL allows clients to precisely request the data they need in a single query, avoiding data and request overhead.
                  Flexibility: GraphQL clients can request specific data using a flexible syntax and nested queries.
                  Dynamic Documentation: GraphQL provides automatic, real-time schema documentation, making it easier for clients to understand available features.

                  
       👎 Drawbacks:
       

                  Learning Curve: Understanding and mastering GraphQL may require a learning curve compared to the more widely adopted REST.
                  Server Overhead: Resolving complex and nested queries in GraphQL may put additional load on the server compared to simple REST requests.


## Features

- Weather microservice: Fetches weather data from an external API based on location ID.
- User authentication microservice: Handles user registration and login.

## Technologies Used

- Node.js
- GraphQL
- Express.js
- MySQL


