const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((el) => el.email === email);

  if (!user) {
    return res.status(200).json({
      status: "fail",
      message: "User not found.",
    });
  }

  if (user.password !== password) {
    return res.status(200).json({
      status: "fail",
      message: "Incorrect password.",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Login successful.",
    data: user,
  });
};

exports.register = (req, res) => {
  const newUser = {
    id: users.length,
    ...req.body,
  };

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something went wrong.",
        });
      }
      res.status(200).json({
        status: "sucess",
        message: "User registered successfully.",
      });
    }
  );
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: users.length,
    data: users,
  });
};

exports.getOneUser = (req, res) => {
  const { id } = req.params; // or get id from params

  const user = users.find((el) => el.id === id);

  if (!user) {
    return res.status(200).json({
      status: "fail",
      message: "User not found.",
    });
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};
