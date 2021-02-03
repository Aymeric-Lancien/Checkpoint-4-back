const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./database");

const { SERVER_PORT, CLIENT_URL } = process.env; // (attention!!!)

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Liste de tous les guitaristes
app.get("/", (request, response) => {
  connection.query("SELECT * FROM guitar_players", (error, result) => {
    if (error) {
      response.status(500).send(error);
    }
    if (result.lenght === 0) {
      response.sendStatus(404);
    } else {
      response.status(200).json(result);
    }
  });
});

app.get("/players/infos/:id", (request, response) => {
  connection.query(
    "SELECT * FROM tracks t JOIN guitar_players gp ON gp.idguitar_players = t.guitar_players_idguitar_players JOIN bands b ON gp.bands_idbands = b.idbands WHERE gp.idguitar_players = ?",
    [request.params.id],
    (error, result) => {
      if (error) {
        response.status(500).send(error);
      }
      if (result.lenght === 0) {
        response.sendStatus(404);
      } else {
        response.status(200).json(result);
      }
    }
  );
});

// Don't write anything below this line!
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});
