# Books API - Code Overview

This README provides a brief overview of the code for the Books API.

## Project Files

*   **`app.js`:**  The main file that runs the API.  It uses Express to handle requests and connects to a PostgreSQL database to get book information.
*   **`seed.js`:**  A script to add some initial book data to the database.  You run this separately.
*   **`package.json`:**  Lists the project's dependencies (libraries it needs) and defines scripts like `start` and `dev`.
*   **`.env`:**  (This file is *not* in the repository). It holds secret information like your database password.

## `app.js` - The Main API File

*   **What it does:**
    *   Sets up a web server using Express.
    *   Connects to your PostgreSQL database.
    *   Defines a route: `/api/v1/books`. This is the URL you use to get book data.
    *   Handles requests to that URL and sends back book information in JSON format.
    * Can filter data sent back.

*   **Key Parts:**
    *   **`require('dotenv').config();`:**  Loads secret information from the `.env` file.
    *   **`const pool = new Pool(...)`:**  Sets up a connection to your database.  The connection details (username, password, etc.) come from the environment variables.  It also requires the `ssl` setting for Render.
    *   **`app.get('/api/v1/books', ...)`:**  This is where the magic happens.  It handles GET requests to `/api/v1/books`.
        *   It builds a SQL query to get data from the `books` table.
        *   It *dynamically* adds filtering to the query based on parameters in the URL (like `?genre=Fantasy`).
        *   It uses *parameterized queries* (the `$1`, `$2`, etc.) for security.  *Never* directly put user input into a SQL query!
        *   It sends the results back as JSON.
    *  **`app.listen(...)`**: Starts the server.

## `seed.js` - Adding Initial Data

* **What it does:** This script creates the books table and populates it with initial data
*   **Key Parts:**
    *   **Connects to the Database:**  Just like `app.js`, it connects to the database.
    *   **`CREATE TABLE IF NOT EXISTS books ...`:** Creates the `books` table (but only if it doesn't already exist).
    *   **`INSERT INTO books ...`:**  Adds the sample book data to the table.
    *   **`pool.end()`: Closes the connection, very important.**

## `package.json` - Project Information
    * **Dependencies**: The packages need for this project, express, pg, body-parser, dotenv, and nodemon

## How to Modify the Code

*   **Add More Filters:**  Look inside the `app.get('/api/v1/books', ...)` function in `app.js`.  You can add more `if` statements to handle other filter parameters (like filtering by ISBN, for example).
*   **Add More Data:** Change the `booksData` array in `seed.js`.
*   **Change the Table Structure:**  If you want to add or remove columns, you need to modify the `CREATE TABLE` statement in `seed.js` *and* update any code that uses those columns (in `app.js` and `seed.js`).

## Important Notes

*   **Security:**  Using parameterized queries (like `$1`, `$2`) is *essential* to prevent SQL injection attacks.
*   **`.env` File:** Keep your `.env` file secret!  Never commit it to Git.
*   **Error Handling:** The code includes basic error handling, but for a real application, you'd want more robust error handling and logging.
* **Environment Variables:** The connection details are set by environment variables.

This simplified README provides a good starting point for understanding the codebase. It avoids overwhelming detail but highlights the key concepts and areas for modification.




*Disclaimer*
This read me was a product of Github Copilot 
Austin