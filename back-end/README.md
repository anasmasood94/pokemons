# Pokémon API

This project is a back-end service for managing and retrieving Pokémon data. It provides endpoints to get a list of Pokémon, search for specific Pokémon, and handle pagination.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/pokemon-api.git
    cd pokemon-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add necessary environment variables. Example:
    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### GET /pokemons

Retrieve a list of Pokémon.

- **Query Parameters:**
  - `searchTerm` (optional): Filter Pokémon by name.
  - `page` (optional): Page number for pagination.
  - `perPage` (optional): Number of results per page.

- **Responses:**
  - `200 OK`: Returns a list of Pokémon.
  - `500 Internal Server Error`: If something goes wrong.

Example request:
```sh
curl -X GET "http://localhost:3000/pokemons?searchTerm=pikachu&page=1&perPage=10"