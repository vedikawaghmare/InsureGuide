const express = require('express');
const router = express.Router();
const axios = require('axios');

// Geocoding proxy to avoid CORS issues
router.get('/geocode', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Query parameter required' });
        }

        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                format: 'json',
                q: q,
                limit: 1,
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'InsureGuide/1.0'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Geocoding error:', error);
        res.status(500).json({ error: 'Geocoding failed', message: error.message });
    }
});

// Reverse geocoding proxy
router.get('/reverse-geocode', async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude required' });
        }

        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                format: 'json',
                lat: lat,
                lon: lon,
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'InsureGuide/1.0'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        res.status(500).json({ error: 'Reverse geocoding failed', message: error.message });
    }
});

module.exports = router;
