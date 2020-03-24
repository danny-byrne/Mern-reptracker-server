const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
// useNewUrlParser mongo nodejs driver rewrote tool usd for mdb cx strgs
// useCreateIndex to deal with mdb deprecating insure index func, deals with updtes to mdb

mongoose.connect(uri, 
    { useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true 
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(cors());
app.use(express.json());

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

