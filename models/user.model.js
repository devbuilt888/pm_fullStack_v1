var mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    orderId: { type: String },
    govId: { type: String },
    dob: { type: String },
    sponsorName: { type: String },
    sponsorTP: { type: String },
    orderId: { type: String }, 
    tpNumber: { type: String}
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
