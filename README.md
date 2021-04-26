![Book Club logo](static/public/logo_200x200.png)

# API Sprint project
This project was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io)
This project was done during a two-day sprint, and had for objective to:
* Code a (very) simple API server
* Make sure to include documentation, database access, and very simple front-end

# Overview
The data model will be extremely simple.
It is meant to represent data related to a book club: users who have an inventory of books and lend books to each other.
We will then have four tables:
* One table of `books`
* One table of `users` (**TBD**)
* One table of 'properties' to represent that several users can have the "same" book, actually a different physical book (**TBD**)
* One table of 'transactions' to store historically when users lent books to each other. (**TBD**)

# Installation
## Server install
The project is made with `npm` so if you clone the repository and run `npm install`, you should have all the packages installed.
Launch the server afterwards with `npm run start`, and open the `localhost` address with your favourite browser.
<http://127.0.0.1/8888>
## Database setup
You will need to setup your database (we recommend PostgreSQL), create a database, and describe in a .env file the connection to this database.
For example,
```
DB_USER=johndoe
DB_PW=passw0rd
DB_NAME=bookclub
```
And save this file as a .env.
(for reference, a `example.env` has been provided in the repo. You can modify this file and rename it `.env`)

# End point documentation
The endpoints are documented with `SwaggerUI` and are accessible within the app page.

# Tech used

I used the following tech to make this project:
* [`Express`](https://expressjs.com) as a REST API server and to serve static files
* [`KNEX`](http://knexjs.org) to access the database
* [`Objection.js`](https://vincit.github.io/objection.js/) to model relationship between various tables
* [`SwaggerUI`](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/) to generate the dynamic API endpoints page
