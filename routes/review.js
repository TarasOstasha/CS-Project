var express = require('express');
var router = express.Router();

const Review = require('../models/reviewModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

console.log(Date.now(), 'reviews')

router.post('/review', (req, res) => {
    const reviewData = req.body;
    console.log(reviewData, 'reviewData');
    const review = new Review({
        grade: reviewData.grade,
        name: reviewData.name,
        message: reviewData.message,
        stars: reviewData.star,
        created: req.body.created
    });
    review.save()
        .then(result => {
            res.status(201).json({
                message: 'New Review Created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
});

module.exports = router;