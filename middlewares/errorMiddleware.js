const fs = require("fs");
function errorMiddleware(error, req, res, next) {
  const reqMethod = req.method;
  const reqUrl = req.url;
  const content = `METHOD -> ${reqMethod}    URL ->${reqUrl} ERROR -> ${error}\n`;
  fs.appendFile("./logs/errorLogs.txt", content, (err) => {
    if (err) console.log(`Error Writing Error Logs in File ${err}`);
    res.status(500).send(`Error: ${error.message}`);
  });
}
module.exports = errorMiddleware;
