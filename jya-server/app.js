var createError = require("http-errors");
var express = require("express");
var sequelize = require("./sequelize/config").sequelize;
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var gameRouter = require("./routes/games");
var eventRouter = require("./routes/events");
var participationRouter = require("./routes/participations");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/games", gameRouter);
app.use("/events", eventRouter);
app.use("/participations", participationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

// Sincronizar el modelo con la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente con la base de datos");

    // Sincronizar los modelos con la base de datos
    await sequelize.sync();
    console.log("Modelo de datos sincronizados");
    // Iniciar el servidor
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
})();

module.exports = app;
