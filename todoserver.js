const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, './files'), (err, data) => {
    if (err) {
      res.status(500).send("Error");
      return;
    }
    res.send(data);
  });
});

app.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, './files', req.params.filename);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }
    res.send(data);
  });
});

app.all('*', (req, res) => {
  res.status(404).send("Route not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
