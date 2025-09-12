const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const dbConfig = require("./config/db");
const reqLoggingMiddleware = require("./middlewares/loggingMiddleware");
const errorloggingMiddleware = require("./middlewares/errorMiddleware");
//MIDDLEWARES
app.use(express.json());
app.use(reqLoggingMiddleware);
app.use(errorloggingMiddleware);

//Db Config
dbConfig
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(`Database Connection Error -> ${err}`);
  });

//ROUTES
app.use("/users", userRoutes);

//SERVER SETUP
app.listen(3002, (err) => {
  if (err) {
    console.log("Error Starting Server");
  } else {
    console.log("Server Started");
  }
});
