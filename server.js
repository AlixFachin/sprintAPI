const { reset } = require('colorette');
const express = require('express');
require('dotenv').config();
path = require('path');

const app = express();

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'static','public')));

// First route to serve static content
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🐗 Running server on port ${port} `);
})