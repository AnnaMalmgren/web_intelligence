## Repository for course 2dv515 assignment 1; Recommendation System
The application is a recommendation system that can find similar users and find recommendations for
a user, using User-Based or Item-Based Collaborative Filtering. The User-Based Collaborative Filtering 
is using Euclidean or Pearson as similarity measure, the Item-Based Collaborative Filtering is using 
only Euclidean.

### Instructions
If you want to run the application locally, clone and download the repository. 
- Do npm install in the root folder, in the server folder and in the client folder. 

A local MySQL database is used. In the file <i>server/.env.example</i> you'll find the 
needed environment variables, create an own .env file with the same variables, and add the values
for the database that should be used. 

#### scripts available for database.
- <i>npm run createTables</i>, create a users, movies, ratings and item_based table. 
- <i>npm run fillLarge</i>, populates database with the large data set
- <i>npm run fillExample</i>, populates database with the example data set
- <i>npm run itemBased</i>, truncate and populate the item based table. 
- <i>npm run resetDB</i>, truncates movies, ratings, users and item_based tables. 

### other scripts
- <i>npm run server</i>, starts only the server
- <i>npm run client</i>, starts only the client
- <i>npm start</i>, starts both sevrer and client. 
