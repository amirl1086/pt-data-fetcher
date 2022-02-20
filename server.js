
// app config
const express = require("express");
const cors = require("cors");
const app = express();

const config = require('config');
const port = config.server.port;

const fetchAPI = require('./routes/fetch');

app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors({origin: `http://${config.server.host}:${port}`}));

// routes
require('./routes/auth')(app);
app.use('/fetch', fetchAPI);

//errors middleware
app.use((error, req, res) => {
    console.log("");
    console.log('error handling middleware called, path: ', req.path);
    console.error('error: ', error);

    if (error.type == 'mongo_init') {
        res.status(500).send(error);
    }
});



(async () => { // eslint-disable-line no-unexpected-multiline
    app.listen(port, () => {
        console.log(`data-fetcher app listening at http://localhost:${port}`)
    });
})();

