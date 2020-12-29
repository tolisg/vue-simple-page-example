const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const { DB_URL } = require('./server/config/DB');

const loginRoutes = require('./server/auth/route');

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
})
  .then(
    () => { console.log('Database connected'); },
    (error) => { console.log('Can not connect to the database', error); }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', loginRoutes);

app.listen(PORT, () => { console.log('Server is running on Port', PORT); });
