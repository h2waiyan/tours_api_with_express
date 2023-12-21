exports.mylogger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Hello from the middleware 👋");
  next();
};
