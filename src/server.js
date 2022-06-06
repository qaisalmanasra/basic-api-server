"use strict"; 
require('dotenv').config();
//imports
const PORT = process.env.PORT || 3000;
const express = require("express");
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).send('welcome to heroku server');
});


app.use(logger);
app.use(foodRouter);
app.use(clothesRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};
