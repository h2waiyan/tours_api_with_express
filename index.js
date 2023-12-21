const express = require("express");
const morgan = require("morgan");
const toursRouter = require("./routers/tours.router");
const usersRouter = require("./routers/users.router");
const middlewares = require("./midddlewares/logger");

const app = express();

app.use(express.json()); // middlewares
app.use(morgan("dev"));
app.use(middlewares.mylogger);

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/users", usersRouter);

app.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});
