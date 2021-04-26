require('dotenv').config();

const express = require('express');
path = require('path');
const dbqueries = require('./dbqueries');

// // Temporary measure -> Loading the package.json() file
// const JSONdata = require('./seedData.json');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static','public')));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

// API Routes

app.get('/books', async (req, res) =>  {
  dbqueries.getAllBooks().then((booklist) => {
    console.log(`Been there: ${JSON.stringify(booklist)}`);
    res.send(booklist);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
})

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await dbqueries.getOneBook(bookId);
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send(`Cannot find book of ID ${bookId}`);
  }
})

app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const nbDeleted = await dbqueries.deleteOneBook(bookId);
    res.status(200).send(`${nbDeleted} records deleted`);
  } catch(error) {
    res.status(404).send(`Cannot delete book of ID ${bookId} ${'\n'} ${error}`);
  }

})


const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🐗 Running server on port ${port} `);
})