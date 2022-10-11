const { Types: { ObjectId } } = require('mongoose');
const Tour = require('../models/Tour');


const tourViewCount = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw Error("Invalid object Id")
        }
        await Tour.updateOne(
            { _id: req.params.id },
            { $inc: { viewCount: 1 } }
        )
        next();
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message
        });
    }

};

module.exports = tourViewCount;