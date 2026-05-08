const express = require('express');
const router = express.Router();
const { generateItinerary, analyzeReviews } = require('../controllers/geminiController');

router.post('/generate-itinerary', generateItinerary);
router.post('/analyze-reviews', analyzeReviews);

module.exports = router;
