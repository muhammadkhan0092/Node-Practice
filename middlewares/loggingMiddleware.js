const fs = require("fs");
function loggingMiddleware(req, res, next) {
  const reqMethod = req.method;
  const reqUrl = req.url;
  const content = `METHOD -> ${reqMethod}    URL ->${reqUrl}\n`;
  fs.appendFile("./logs/requestLogs.txt", content, (err) => {
    if (err) console.log(`Error Writing Request Logs in File ${err}`);
    next();
  });
}
module.exports = loggingMiddleware;
