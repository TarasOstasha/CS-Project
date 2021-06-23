const mongoose = require('mongoose');


const creditCardInfoSchema = mongoose.Schema({
    name: { type: String, require: true },
    card_number: { type: String, require: true },
    expire: { type: String, require: true },
    cvv: { type: String, require: true },
    created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('CreditCardInfo', creditCardInfoSchema);