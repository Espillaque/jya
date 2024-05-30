var express = require("express");
var router = express.Router();

"Check from the browser if the server is working"
router.get("/", function (req, res) {
  res.send("index");
});

/* It checks if it works */
router.post("/echo", function (req, res) {
  res.send(req.body);
});

module.exports = router;
