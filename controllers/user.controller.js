// import { Types } from 'mongoose';
var User = require('../models/user.model');
// var * as consts from '../consts';
var acceptPaymentPage = require('../authorize');

const getHostedToken = async (req, res) => {
    const {
        query: {
            amount,
            url
        },
    } = req;

    // this params are supposed to be sent in the future to change price and redirect url
    // for now I just want to get the token
    try {
        // console.log(req);

        const hostedToken = await acceptPaymentPage.getAnAcceptPaymentPage(amount, url);
        res.status(200).json({ token: hostedToken });
    } catch (error) {
        // return error response
    }


    // return res.status(200).json({ status: "success", totalCount});
}

// get right user info from mongoose with order id, send info back
const getUser = (req, res) => {
    const uniqueId = req.params.id;

    // Query a user by userId without password property
    User.findOne({ orderId: uniqueId })
        .exec((err, user) => {
            // Exit with returning error response
            if (err || !user) {
                return res.status(404).json({ status: 'failed' });
            }
            // Return user data
            res.json(serializeUser(user));
        });
};

const order = (req, res) => {
    const {
        body: {
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            zipCode,
            orderId,
            tpNumber
        }
    } = req;


    const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        zipCode,
        orderId,
        tpNumber
    });
    newUser.save((userError, user) => {
        if (userError) {
            return res.status(403).send(userError);
        }
        // Return success response
        return res.status(200).json({ status: 'success' });
    });
}
const signup = (req, res) => {
    const {
        body: {
            firstName,
            lastName,
            email,
            phone,
            street,
            zipCode,
            city,
            govId,
            dob,
            sponsorName,
            sponsorTP,
            orderId
        },
    } = req;

    const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        street,
        zipCode,
        city,
        govId,
        dob,
        sponsorName,
        sponsorTP,
        orderId
    });
    newUser.save((userError, user) => {
        if (userError) {
            return res.status(403).send(userError);
        }
        // Return success response
        return res.status(200).json({ status: 'success' });
    });

}


// Serialize a user object
function serializeUser(user) {
    const { firstName, lastName, email, phone, street, zipCode, city, govId, dob, sponsorName, sponsorTP, orderId } = user;
    return { firstName, lastName, email, phone, street, zipCode, city, govId, dob, sponsorName, sponsorTP, orderId };
}

module.exports.getHostedToken = getHostedToken;
module.exports.signup = signup;
module.exports.getUser = getUser;
module.exports.order = order;
