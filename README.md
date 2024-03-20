# Template API

## Database Configuration

The API uses MySQL as a database to store information about events and users. Ensure you follow these steps to set up the database correctly:

1. Install MySQL: If you don't have MySQL installed, you can download it from [@the official website](https://www.mysql.com/downloads/).

2. Create a Database: Create a database in MySQL that the API will use. The database name should match the one specified in the .env configuration file. You can use a tool like MySQL Workbench or run SQL commands to create it.

3. Configuration in the .env File:

Ensure that the .env file in the root of your project contains the correct configuration for MySQL. It should have variables like DB_PORT and JWT SECRET (there's a .env.example file).

4. MySQL Client in the API: The API uses a module called MySQLClient.js to manage the database connection. Make sure this file is configured to use the environment variables from the .env file and the values defined in config.js:

- `address` should be "localhost" or the address of your MySQL database.
- `user` should be "demo" or the user of your MySQL database.
- `password` should be obtained from process.env.DB_PASSWORD or use "password" if not provided in the .env file.
- `database` should be "MeeMee" or the name of your MySQL database.

## Create Database Tables

Open the terminal and write:

```
npm run migrate
```

This command initializes tables in the database using Node.js. When you run this command, it connects to the database and creates the necessary tables for the API to function. This command should be executed only once, before using the API for the first time or if you need to restart the database tables. This command already creates the database preloaded with users and shipments.

## Run the API

To run the API, follow these steps:

1. Install Dependencies: Open a terminal in the root of your project and run the following command to install dependencies:

```
npm i
```

2. Start the API: Once dependencies are installed, you can start the API with the following command:

```
npm start
```

The API should be listening on a specific port. You can access it through the routes defined in the controllers.

## Endpoints

### Users

- `POST /user/register`: Registers a new user on the platform.

- `POST /user/login`: Logs in to the platform.

- `GET /user/:id`: Gets information about a user by their ID.

## Run Tests

To run tests for the MeeMee API open a terminal in the root of your project and run the following command:

```
npm run test
```

## Tech stack

- Node.js: The platform on which the application is built.

- Express.js: A web framework for Node.js, used in constructing the API.

- Cors: A middleware for Express used to enable cross-origin resource sharing.

- Dotenv: A package for loading environment variables from a .env file.

- Joi: A data validation library for Node.js, used for data validation in the application.

- JsonWebToken (JWT): A library for creating and verifying JWT authentication tokens.

- Morgan: A middleware for Express used for HTTP request logging.

- mysql2: A MySQL driver for Node.js, used to interact with the MySQL database.

- mysql2-promise: A library providing promise functions for working with mysql2.

- UUID: A library for generating unique identifiers (UUID).

- Vitest: A testing framework for Vue 3 applications. Used for project testing.

- Bcrypt: A hashing library specialized in password security for web applications.
