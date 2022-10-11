const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controllers');
const tourViewCount = require('../middleware/tourViewCount');

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

router
    .route('/trending')
    .get(tourController.getTopThreeViewedTour)

router
    .route('/cheapest')
    .get(tourController.getThreeCheapestTour)

router
    .route("/:id")
    .get(tourViewCount, tourController.getTourById)
    .patch(tourController.updateTourById)

module.exports = router;