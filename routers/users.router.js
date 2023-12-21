const express = require("express");
const userCtrl = require("../controllers/users.ctrl");

const usersRouter = express.Router();

usersRouter.route("/").get(userCtrl.getAllUsers);

usersRouter.route("/login").post(userCtrl.login);
usersRouter.route("/register").post(userCtrl.register);

usersRouter
  .route("/:id")
  .get(userCtrl.getOneUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = usersRouter;
