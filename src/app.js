require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorhandler = require('./error-handler');
const validateBearerToken = require('./validate-api-token');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

// Middleware functions
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use(errorhandler)

app.get('/', (req, res) => {
    res.send('Hello, bookmarker!');
});



module.exports = app;
