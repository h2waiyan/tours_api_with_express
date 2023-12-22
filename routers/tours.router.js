const express = require("express");
const tourCtrl = require("../controllers/tours.ctrl");

const toursRouter = express.Router();

//mounting the router
toursRouter
  .route("/")
  .get(tourCtrl.getAllTours)
  .post(tourCtrl.checkBody, tourCtrl.postNewTour);

toursRouter
  .route("/:id")
  .get(tourCtrl.getTourById)
  .patch(tourCtrl.updateTourById)
  .delete(tourCtrl.deleteTourById);

toursRouter.param("id", tourCtrl.checkId);

module.exports = toursRouter;
