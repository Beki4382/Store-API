  const express = require('express');
  const app = express()
  require('dotenv').config();
  const connectDB = require('./db/connect');
  const port = process.env.PORT || 3000;
  const product = require('./router/products');

  app.use(express.json())
  app.use('/api/v1/products', product);
  app.get('/hello', (req, res) => {
      res.send('helloooo')
  })

  const start = async() => {
      try {
          await connectDB(process.env.MongoDB);
          app.listen(port, console.log(`server is listening on port ${port}`));
      } catch (err) {
          console.log(err)
      }
  }

  start();