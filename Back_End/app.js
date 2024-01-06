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

//Display table values into table
app.get("/polltrends/", (req, res) => {
  const sql = "SELECT * FROM vote";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        message: "oops!!...Something went wrong!!",
      });
    } else {
      return res.json(result);
    }
  });
});

app.get("/counts", (req, res) => {

  const sql = `
  SELECT COUNT(*) as count, DATE(casted_at) as casted_at
  FROM vote
  GROUP BY DATE(casted_at)
  ORDER BY casted_at
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving data..", err);
    } else {
      const data = result.map((row) => ({
        count: row.count,
        casted_at: row.casted_at.toISOString().split("T")[0],
      }));
      res.json({ data });
    }
  });
});

app.get("/results", (req, res) => {
  const sql = `
    SELECT COUNT(*) as count, voting_choice
    FROM vote
    GROUP BY voting_choice
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving data...", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const data = result.map((row) => ({
        count: row.count,
        voting_choice: row.voting_choice === 1,
      }));
      res.json({ data });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
