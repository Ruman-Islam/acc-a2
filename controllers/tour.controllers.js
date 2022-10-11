const tourServices = require('../services/tour.services');
const { Types: { ObjectId } } = require('mongoose');


exports.createTour = async (req, res, next) => {
    try {
        const result = await tourServices.createTourService(req.body);
        res.status(200).json({
            status: "success",
            message: "Data inserted successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message
        });
    }
};


exports.getAllTours = async (req, res, next) => {
    // http://localhost:5000/api/v1/tour?fields=name,price&sort=price,date&price[gte]=700&page=1&limit=2
    try {
        let filters = { ...req.query }

        const excludeFields = ['fields', 'sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field]);

        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.fields) {
            const fieldBy = req.query.fields.split(',').join(' ');
            queries.fieldBy = fieldBy;
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.page) {
            const { page = 0, limit = 10 } = req.query;
            const skip = (page - 1) * Number(limit);
            queries.skip = skip;
            queries.limit = +limit;
        }

        const result = await tourServices.getAllToursService(filters, queries);
        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message
        });
    }
};


exports.getTourById = async (req, res, next) => {
    try {
        const result = await tourServices.getTourByIdService(req.params.id);
        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message
        });
    }
};


exports.updateTourById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        if (!ObjectId.isValid(req.params.id)) {
            throw Error("Invalid object Id")
        }
        const result = await tourServices.updateTourByIdService(id, body);
        res.status(200).json({
            status: "success",
            message: "successfully updated the tour",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't update the tour",
            error: error.message
        });
    }
};


exports.getTopThreeViewedTour = async (req, res, next) => {
    try {
        const result = await tourServices.getTopThreeViewedTourService();
        res.status(200).json({
            status: "Success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message
        });
    }
};


exports.getThreeCheapestTour = async (req, res, next) => {
    try {
        const result = await tourServices.getThreeCheapestTourService();
        res.status(200).json({
            status: "Success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get the data",
            error: error.message
        });
    }
};