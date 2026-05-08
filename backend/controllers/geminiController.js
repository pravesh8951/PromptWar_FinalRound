const { GoogleGenAI } = require('@google/genai');

const generateItinerary = async (req, res) => {
    try {
        const { destination, budget, duration, interests, travelStyle } = req.body;

        if (!destination || !duration) {
            return res.status(400).json({ error: 'Destination and duration are required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Gemini API Key is not configured' });
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        const prompt = `Create a personalized travel itinerary for a trip to ${destination}.
        Duration: ${duration} days.
        Budget Level: ${budget || 'Moderate'}.
        Interests: ${interests ? interests.join(', ') : 'General sightseeing'}.
        Travel Style: ${travelStyle || 'Balanced'}.
        
        Provide the response as a valid JSON object EXACTLY in this format:
        {
          "estimatedTotalCost": "string (e.g. '$1500')",
          "budgetBreakdown": {
            "transport": "string (percentage or amount)",
            "accommodation": "string",
            "food": "string",
            "activities": "string"
          },
          "dailyEstimate": "string (e.g. '$200/day')",
          "optimizationSuggestions": ["string", "string"],
          "recommendations": ["string", "string"],
          "foodRecommendations": ["string", "string"],
          "travelTips": ["string", "string"],
          "days": [
            {
              "day": number,
              "theme": "string",
              "activities": [
                {
                  "time": "string",
                  "title": "string",
                  "description": "string",
                  "cost": "string"
                }
              ]
            }
          ]
        }`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        
        try {
            const parsedData = JSON.parse(text);
            res.json(parsedData);
        } catch (e) {
            res.status(500).json({ error: 'Failed to parse AI response', raw: text });
        }
    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
};

const analyzeReviews = async (req, res) => {
    try {
        const { destination, reviews } = req.body;

        if (!destination) {
            return res.status(400).json({ error: 'Destination is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Gemini API Key is not configured' });
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        const prompt = `Analyze traveler reviews and sentiment for ${destination}. 
        If specific reviews are provided, use them: ${reviews ? JSON.stringify(reviews) : 'Use your internal knowledge if no specific reviews provided.'}.
        
        Provide the response as a valid JSON object EXACTLY in this format:
        {
          "destination": "string",
          "overallRating": number (1-5),
          "sentimentDistribution": {
            "positive": number (percentage),
            "negative": number (percentage),
            "neutral": number (percentage)
          },
          "strengths": ["string", "string"],
          "commonComplaints": ["string", "string"],
          "aiInsights": "string",
          "hiddenGems": [
            {
              "name": "string",
              "reason": "string"
            }
          ],
          "sampleReviews": [
            {
              "user": "string",
              "rating": number,
              "sentiment": "positive | negative | neutral",
              "text": "string"
            }
          ]
        }`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        
        try {
            const parsedData = JSON.parse(text);
            res.json(parsedData);
        } catch (e) {
            res.status(500).json({ error: 'Failed to parse AI response', raw: text });
        }
    } catch (error) {
        console.error('Error analyzing reviews:', error);
        res.status(500).json({ error: 'Failed to analyze reviews' });
    }
};

module.exports = {
    generateItinerary,
    analyzeReviews
};
