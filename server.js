var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 8080,
  host: "localhost",
  user: "root",
  password: "Welser2017!",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});



app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: data });
  });
});



app.post("/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger_name], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

  
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});



app.get("/burgers", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});


app.put("/burgers/:id", function(req, res) {
  connection.query("UPDATE burgers SET burger_name = ? WHERE id = ?", [
    req.body.burger_name, req.params.id
  ], function(err, result) {
    if (err) {
      
      return res.status(500).end();
    } else if (result.changedRows == 0) {
      
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



app.delete("/burgers/:id", function(req, res) {
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      
      return res.status(500).end();
    } else if (result.affectedRows == 0) {
      
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


app.listen(port, function() {
  console.log("listening on port", port);
});
