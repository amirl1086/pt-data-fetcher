
const express = require("express");

const config = require('config');

const app = express()
const port = config.server.port



(async () => { // eslint-disable-line no-unexpected-multiline
  app.use(express.json());
  app.use('/fetch', require('./lib/fetch'))

  // await mongoUtils.initDB();


  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
  })
})();