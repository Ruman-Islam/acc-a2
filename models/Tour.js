const mongoose = require("mongoose");

const Tour_Schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for tour"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please provide a image for tour"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for tour"],
        integer: true,
    },
    place: {
        type: String,
        required: [true, "Please provide a place name for tour"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for tour"],
    },
    date: {
        type: String,
        required: [true, "Please provide a date for tour"],
    },
    viewCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


const Tour = mongoose.model("Tour", Tour_Schema);

module.exports = Tour;