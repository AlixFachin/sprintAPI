const { reset } = require('colorette');
const express = require('express');
require('dotenv').config();
path = require('path');

// Temporary measure -> Loading the package.json() file
const data = require('./seedData.json');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static','public')));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

// API Routes
app.get('/books', (req, res) => {
  res.send(data.books);
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