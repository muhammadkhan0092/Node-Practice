function checkBodyMiddleWare(req, res, next) {
  const body = req.body;
  if (!body) {
    next(new Error("Body Not Found"));
  } else {
    console.log("Passing the Request");
    next();
  }
}
module.exports = checkBodyMiddleWare;
