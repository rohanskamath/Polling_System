const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//Connection to Express
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "poll",
});

db.connect((err) => {
  if (err) {
    console.log("Connection Failed!!!");
  } else {
    console.log("Connected to Database!!");
  }
});

// Storing Votes in the database
app.post("/pollstation/", (req, res) => {
  const sql =
    "INSERT INTO vote (name, voting_choice, casted_at) VALUES (?,?,?)";
  db.query(
    sql,
    [req.body.name, req.body.vote_choice, req.body.casted_vote],
    (err, result) => {
      if (err) {
        return res.json({
          message: "oops!!...Something went wrong!!",
        });
      } else {
        return res.json({
          success: "Voted Successfullyy!! Thank You!!!",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
