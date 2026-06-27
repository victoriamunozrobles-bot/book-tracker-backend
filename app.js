const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json());

app.use(requestLogger);

app.use("/api", routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

module.exports = app;
