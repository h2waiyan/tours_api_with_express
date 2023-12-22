const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const toursRouter = require("./routers/tours.router");
const usersRouter = require("./routers/users.router");
const middlewares = require("./midddlewares/logger");

dotenv.config("./.env");

const app = express();

console.log(app.get("env")); // express

console.log(process.env); // node

app.use(express.json()); // middlewares
app.use(
  cors({
    origin: "*",
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(middlewares.mylogger);

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/users", usersRouter);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${process.env.PORT} `);
});
