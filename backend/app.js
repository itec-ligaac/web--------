const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json()); //TODO: use sth else
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
