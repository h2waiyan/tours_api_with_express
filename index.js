const express = require("express");
const tourCtrl = require("./controllers/tours.ctrl");

const app = express();

// own middleware
const mylogger = (req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
};

app.use(express.json()); // middlewares
app.use(mylogger);

app.route("/api/v1/tours").get(tourCtrl.getAllTours).post(tourCtrl.postNewTour);

app
  .route("/api/v1/tours/:id")
  .get(tourCtrl.getTourById)
  .patch(tourCtrl.updateTourById)
  .delete(tourCtrl.deleteTourById);

app.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});
