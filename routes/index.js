var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', chain: BLOCKCHAIN.CHAIN });
});

router.post('/', function(req, res, next) {
  BLOCKCHAIN.ADD_BLOCK(req.body.data);
  res.redirect('/');
});

module.exports = router;
