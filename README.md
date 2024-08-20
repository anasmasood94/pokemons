# Pokemon Dex

This repository contains both the backend and frontend for the Pokemon application. Below you'll find instructions for setting up and running both parts of the project.

## Backend Setup

The backend is a Node.js application with an Express server and MongoDB database. It provides APIs for managing Pokemon data and user favorites.

### Prerequisites

    - Node.js (18 or later)
    - MongoDB

### Installation

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3.Create a .env file in the backend directory and add your MongoDB connection string and other environment variables. Example:

    ```
    MONGO_URI=mongodb://localhost:27017/pokemondb
    ```

4. Seed the database with the records of pokemons by running this command

    ```
    npm seed
    ```

### Running the Backend
1. Start the MongoDB server (if not already running):

    ```
    mongod
    ```

2. Run the backend server:

    ```
    npm start
    ```

3. The server should be running on http://localhost:3001.

### Testing the Backend

1. To run tests, navigate to the backend directory and run:

    ```
    npm test
    ```

## Frontend Setup

The frontend is a React application that interacts with the backend APIs to display Pokemons.

### Prerequisites

    - Node ( 18 or later)
    - npm

### Installation
1. Navigate to the frontend directory:

    ```
    cd frontend
    ```
2. Install dependencies:

    ```
    npm install
    ```
### Running the Frontend
1. Start the development server:

    ```
    npm start
    ```
2. The application should be running on http://localhost:3000.

### Testing the Frontend
To run tests, navigate to the frontend directory and run:

    ````
    npm test
    ````