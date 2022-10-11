const Tour = require('../models/Tour');
const mongoose = require('mongoose');


exports.createTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.getAllToursService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fieldBy);
    const totalTours = await Tour.countDocuments(filters);
    const pageCount = Math.ceil((totalTours / queries.limit))
    return { totalTours, pageCount, tours };
};

exports.getTourByIdService = async (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
        const tour = await Tour.findById(id)
        return tour;
    }
};

exports.updateTourByIdService = async (tourId, data) => {
    // const result = await Product.updateOne(
    //     { _id: productId },
    //     { $set: data },
    //     { runValidators: true }
    // )
    const tour = await Tour.findById(tourId);
    const result = await tour.set(data).save();
    return result;
};

exports.getTopThreeViewedTourService = async () => {
    const topThree = await Tour.find({})
        .sort({ viewCount: -1 })
        .limit(3)
    return topThree;
};

exports.getThreeCheapestTourService = async () => {
    const topThree = await Tour.find({})
        .sort({ price: 1 })
        .limit(3)
    return topThree;
};