const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

// Configure enviroment
dotenv.config();

// Conection to DB
const connectDB = require("./config/connectDB");
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.urlencoded({ exteded: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));

// Set templete Engine
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "views")));

// route prefix
app.use("/", require("./routes/routes"));

mongoose.connection.once("open", () => {
  console.log("Connection To DB Succsesully");
  app.listen(PORT, () => {
    console.log(`Server Run on Port http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", () => {
  console.log(`Can't Connect to DB with Server`);
});
