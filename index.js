// Calling the packages that we need

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");

// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects
app.use(cors());
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
  // const url = req.body.url;
  const url = "http://10.10.65.176:3000";

  if (url.length === 0) res.send("Empty Data!");
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");

    res.render("scan", { src });
  });
  //   res.render("index");
});

app.post("/login", (req, res) => {
  const userNmae = req.body.username;
  const password = req.body.password;

  if (userNmae === "admin" && password === "admin") {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// Blank input
// Incase of blank in the index.ejs file, return error
// Error  - Empty Data!
app.post("/scan", (req, res) => {
  // const url = req.body.url;
  const url = "http://10.10.65.176:3000";

  if (url.length === 0) res.send("Empty Data!");
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");

    res.render("scan", { src });
  });
});

// Setting up the port for listening requests
app.listen(port, () => console.log("Server at 5000"));
