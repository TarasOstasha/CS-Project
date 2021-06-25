const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({
    name: { type: String, require: true },
    last_name: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    period: { type: String, require: true },
    cleaning_type: { type: String, require: true },
    property_type: { type: String, require: true },
    frequency: { type: String, require: true },
    sq_ft: { type: String, require: true },
    bedrooms: { type: String, require: true },
    bathrooms: { type: String, require: true },
    suite: { type: String },
    price: { type: String, require: true },
    doorAccess: { type: String, require: true },
    specialInstructions: { type: String },
    howDidYouHear: { type: String },
    payBy: { type: String, require: true },
    created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Booking', bookingSchema);