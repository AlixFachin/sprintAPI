require('dotenv').config();

const { Model } = require('objection');
const { knex } = require('./knex');

const express = require('express');
path = require('path');

// Temporary measure -> Loading the package.json() file
const JSONdata = require('./seedData.json');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static','public')));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

// API Routes
// DATABASE QUERIES
// give the knell instance to objection
Model.knex(knex);

// first Model
class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get idColumn() {
    return 'id';
  }

}

app.get('/books', async (req, res) =>  {
  
  Book.query().then((booklist) => {
    console.log(`Been there: ${JSON.stringify(booklist)}`);
    res.send(booklist);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });

})

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookList = data.books.filter(book => Number(book.id) === Number(bookId));
  if (bookList.length === 1) {
    res.status(200).send(bookList[0]);
  } else {
    res.status(404).send(`Cannot find book of ID ${bookId}`);
  }
})

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🐗 Running server on port ${port} `);
})