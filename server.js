require('dotenv').config();

const express = require('express');
path = require('path');
const dbqueries = require('./dbqueries');

// Necessary lines for the API Doc library
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { ConstraintViolationError } = require('db-errors');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API For Book Club inventory',
    version: '1.0.0',
    description: 'This is an API made with Express, Knex and Objection. It retrieves book resources to manage a local book club',
    license: {
      name:' Licensed under MIT',
      url:'/https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'BookClub API',
      url: 'https://github.com/AlixFachin/sprintAPI'
    }
  },
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


// // Temporary measure -> Loading the package.json() file
// const JSONdata = require('./seedData.json');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

// API Routes

/**
 * @swagger
 * /books:
 *  get:
 *    summary: Retrieve the list of all the books present in the book club inventory
 *    description: Retrieves the list of all the books in the database. 
 *    responses:
 *      200:
 *        description: a list of users.
 *        content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                     id:
 *                       type: integer
 *                       description: the user ID
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: book title
 *                       example: 'Grapes of Wrath'
 *                     author:
 *                        type: string
 *                        description: author name
 *                        example: 'John Steinbeck'
 *                     genre:
 *                        type: string
 *                        description: genre type
 *                        example: 'Drama'
 * 
 */

app.get('/books', async (req, res) =>  {
  dbqueries.getAllBooks().then((booklist) => {
    console.log(`Been there: ${JSON.stringify(booklist)}`);
    res.send(booklist);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});


/**
 * @swagger
 * /books/{id}:
 *  get:
 *    summary: Retrieve a single book from the database
 *    description: Retrieves data corresponding to one book in the database. 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: integer
 *        required: true
 *        description: numeric ID of the book ID to get
 *    responses:
 *      200:
 *        description: book corresponding to the parameter id.
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: integer
 *                    description: the user ID
 *                    example: 1
 *                  title:
 *                    type: string
 *                    description: book title
 *                    example: 'Grapes of Wrath'
 *                  author:
 *                     type: string
 *                     description: author name
 *                     example: 'John Steinbeck'
 *                  genre:
 *                     type: string
 *                     description: genre type
 *                     example: 'Drama'
 *      404:
 *           description: book not found - database returned empty query
 * 
 */

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await dbqueries.getOneBook(bookId);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send(`Cannot find book of ID ${bookId}`);
    }
  } catch (error) {
    res.status(404).send(`Cannot find book of ID ${bookId}`);
  }
});

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *    summary: Delete a single book from the database
 *    description: Delete one record from the database. 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: integer
 *        required: true
 *        description: numeric ID of the book ID to get
 *    responses:
 *      200:
 *        description: number of entries deleted.
 *        content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: number of records deleted
 */

app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const nbDeleted = await dbqueries.deleteOneBook(bookId);
    res.status(200).send(`${nbDeleted} records deleted`);
  } catch(error) {
    res.status(404).send(`Cannot delete book of ID ${bookId} ${'\n'} ${error}`);
  }

});

/**
 * @swagger
 * /books:
 *  post:
 *    summary: Inserts a new book from the database
 *    description: Creates a new book record in the database according to the request body. 
 * 
 */

app.post('/books', async (req, res) => {
  const newBookData = req.body;
  try {
    const insertedBook = await dbqueries.createOneBook(newBookData);
    res.status(200).send(insertedBook);
  } catch(error) {
    res.status(404).send(`Error in creating new record` + `\n` + `${error}`);
  }

});

/**
 * @swagger
 * /books/{id}:
 *  patch:
 *    summary: Updates a new book from the database
 *    description: Creates a new book record in the database according to the request body. 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: integer
 *        required: true
 *        description: numeric ID of the book ID to be updated
 *    responses:
 *      200:
 *        description: returns the new object value.
 */

app.patch('/books/:id', async (req, res)=> {
  const updateBookData = req.body;
  const bookId = req.params.id;
  try {
    const updatedBook = await dbqueries.updateOneBook(bookId, updateBookData);
    res.status(200).send(updatedBook);
  } catch(error) {
    res.status(404).send(`Error in creating new record` + `\n` + `${error}`);
  }

});


const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🐗 Running server on port ${port} `);
})