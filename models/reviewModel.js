const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    created: { type: String },
    emailReview: 'string',
    nameReview: 'string',
    messageReview: 'string',
    stars: 'string'
});


module.exports = mongoose.model('Review', reviewSchema);