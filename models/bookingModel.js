const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({
    name: { type: String, require: true },
    last_name: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    zip_code: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Booking', bookingSchema);