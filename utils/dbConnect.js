const mongoose = require("mongoose");

const DBConnect = () => {
    mongoose
        .connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database connected successfully.')
        })
        .catch(err => console.log('Error message -', err))
};

module.exports = DBConnect;