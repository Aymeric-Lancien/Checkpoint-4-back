const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./databases/database');

const { SERVER_PORT, CLIENT_URL } = process.env; // (attention!!!)

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Don't write anything below this line!
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});