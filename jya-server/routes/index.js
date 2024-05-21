var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('index');
});


/* GET home page. */
router.post('/echo', function(req, res) {
  res.send(req.body);
});

module.exports = router;