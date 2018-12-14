var express = require('express');
var router = express.Router();
const tf = require('@tensorflow/tfjs');
/* GET home page. */
router.get('/',function(req,res){
  res.render('index',{title:'HOME'})
})
router.get('/mnsit', function(req, res) {
  res.render('mnsit', { title: 'Digit Reconginiton' });
});
router.get('/object',function(req,res) {
  res.render('object',{title:'Object detection'})
})
module.exports = router;
