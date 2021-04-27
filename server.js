require('dotenv').config();

const express = require('express');
path = require('path');
const dbqueries = require('./dbqueries');

// Necessary lines for the API Doc library
// const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

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

const swaggerSpec = YAML.load('./yaml/bookclub.yaml');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

// API Routes

// -=-=-=-=-=-=-=-=-=-=-=-=  Books -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

app.get('/books', async (req, res) =>  {
  dbqueries.getAllBooks().then((booklist) => {
    res.send(booklist);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

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

app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const nbDeleted = await dbqueries.deleteOneBook(bookId);
    res.status(200).send(`${nbDeleted} records deleted`);
  } catch(error) {
    res.status(404).send(`Cannot delete book of ID ${bookId} ${'\n'} ${error}`);
  }

});

app.post('/books', async (req, res) => {
  const newBookData = req.body;
  try {
    const insertedBook = await dbqueries.createOneBook(newBookData);
    res.status(200).send(insertedBook);
  } catch(error) {
    res.status(404).send(`Error in creating new record` + `\n` + `${error}`);
  }

});

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

// -=-=-=-=-=-=-=-=-=-=-=-=  Books -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

app.get('/users', async (req, res) => {
  dbqueries.getAllUsers().then( (userList) => {
    res.send(userList);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })

});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const returnUser = await dbqueries.getOneUser(userId);
    if (returnUser) {
      res.status(200).send(returnUser);
    } else {
      res.status(404).send(`Cannot find user of ID ${userId}`);
    }
  } catch(error) {
    res.status(500).send(`Server error:  ${error}`)
  }
});



const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🐗 Running server on port ${port} `);
})