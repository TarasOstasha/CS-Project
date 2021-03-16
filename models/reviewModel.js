const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    grade: { type: String, require: true },
    name: { type: String, require: true },
    message: { type: String, require: true },
    stars: { type: Number, require: true },
    created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Review', reviewSchema);