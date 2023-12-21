const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: tours,
  });
};

exports.postNewTour = (req, res) => {
  const newTour = {
    id: tours.length,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something went wrong.",
        });
      }
      res.status(200).json({
        status: "sucess",
        message: "Data has been added successfully.",
      });
    }
  );
};

exports.getTourById = (req, res) => {
  const id = parseInt(req.params.id);

  // find the tour with the id
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(200).json({
      status: "success",
      message: "No tour found with that id.",
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
};

exports.updateTourById = (req, res) => {
  const id = parseInt(req.params.id); // 3
  const updateData = req.body;
  // find the tour with the id
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(200).json({
      status: "success",
      message: "No tour found with that id.",
      data: [],
    });
  }

  const updatedTours = tours.map((tour) => {
    if (tour.id === id) {
      return { ...tour, ...updateData };
    }
    return tour;
  });

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something went wrong.",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully updated the tour.",
        data: tour,
      });
    }
  );
};

exports.deleteTourById = (req, res) => {
  const id = parseInt(req.params.id);
  // find the tour with the id
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(200).json({
      status: "success",
      message: "No tour found with that id.",
      data: [],
    });
  }

  // update the tour - req.body -> write data in file

  res.status(200).json({
    status: "success",
    message: "Successfully deleted the tour.",
  });
};
