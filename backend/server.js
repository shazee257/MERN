const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
