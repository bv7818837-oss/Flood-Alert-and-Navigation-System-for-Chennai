// Flood Prediction Module
const axios = require('axios');

// Mock data for flood zones in Chennai
const floodZones = {
    'adyar': { risk: 'high', elevation: 6.7, historicalFloods: 3 },
    't nagar': { risk: 'medium', elevation: 8.2, historicalFloods: 2 },
    'velachery': { risk: 'high', elevation: 5.8, historicalFloods: 4 },
    'guindy': { risk: 'low', elevation: 12.1, historicalFloods: 1 },
    'mylapore': { risk: 'medium', elevation: 7.5, historicalFloods: 2 },
    'anna nagar': { risk: 'low', elevation: 15.3, historicalFloods: 0 },
    'chromepet': { risk: 'high', elevation: 6.2, historicalFloods: 3 },
    'tambaram': { risk: 'high', elevation: 5.9, historicalFloods: 4 },
    'sholinganallur': { risk: 'medium', elevation: 9.8, historicalFloods: 1 },
    'thiruvanmiyur': { risk: 'medium', elevation: 8.5, historicalFloods: 2 },
    'egmore': { risk: 'medium', elevation: 7.8, historicalFloods: 2 },
    'royapettah': { risk: 'high', elevation: 6.5, historicalFloods: 3 },
    'nungambakkam': { risk: 'medium', elevation: 8.0, historicalFloods: 1 },
    'koyambedu': { risk: 'low', elevation: 13.2, historicalFloods: 0 },
    'ashok nagar': { risk: 'medium', elevation: 7.9, historicalFloods: 1 },
    'vadapalani': { risk: 'low', elevation: 10.5, historicalFloods: 0 },
    'porur': { risk: 'medium', elevation: 9.2, historicalFloods: 1 },
    'sembakkam': { risk: 'high', elevation: 6.8, historicalFloods: 3 },
    'medavakkam': { risk: 'high', elevation: 6.3, historicalFloods: 4 },
    'perungudi': { risk: 'high', elevation: 5.5, historicalFloods: 5 },
    'thirumangalam': { risk: 'medium', elevation: 8.7, historicalFloods: 1 },
    'anna salai': { risk: 'medium', elevation: 7.6, historicalFlolds: 2 },
    'mount road': { risk: 'medium', elevation: 7.6, historicalFloods: 2 },
    'gst road': { risk: 'low', elevation: 11.2, historicalFloods: 0 },
    'ecr': { risk: 'medium', elevation: 8.0, historicalFloods: 2 },
    'east coast road': { risk: 'medium', elevation: 8.0, historicalFloods: 2 },
    'omr': { risk: 'high', elevation: 6.0, historicalFloods: 4 },
    'old mahabalipuram road': { risk: 'high', elevation: 6.0, historicalFloods: 4 },
    'poonamallee high road': { risk: 'medium', elevation: 7.8, historicalFloods: 1 },
    'velachery main road': { risk: 'high', elevation: 5.8, historicalFloods: 4 },
    '100 feet road': { risk: 'medium', elevation: 8.3, historicalFloods: 1 },
    'luz church road': { risk: 'medium', elevation: 7.7, historicalFloods: 2 },
    'santhome': { risk: 'high', elevation: 6.2, historicalFloods: 3 },
    'mylapore tank': { risk: 'high', elevation: 6.1, historicalFloods: 3 },
    'mandaveli': { risk: 'medium', elevation: 7.3, historicalFloods: 2 },
    't.nagar pondy bazaar': { risk: 'medium', elevation: 8.2, historicalFloods: 2 },
    'pondy bazaar': { risk: 'medium', elevation: 8.2, historicalFloods: 2 },
    'nandanam': { risk: 'medium', elevation: 7.9, historicalFloods: 2 },
    'saidapet': { risk: 'high', elevation: 6.4, historicalFloods: 3 },
    'kotturpuram': { risk: 'medium', elevation: 7.6, historicalFloods: 1 },
    'indra nagar': { risk: 'low', elevation: 10.8, historicalFloods: 0 },
    'alwarpet': { risk: 'medium', elevation: 7.8, historicalFloods: 2 },
    't. nagar': { risk: 'medium', elevation: 8.2, historicalFloods: 2 },
    'besant nagar': { risk: 'medium', elevation: 8.1, historicalFloods: 1 },
    'neelankarai': { risk: 'high', elevation: 5.9, historicalFloods: 3 },
    'thiruvanmiyur beach': { risk: 'high', elevation: 5.7, historicalFloods: 4 },
    'adyar river': { risk: 'high', elevation: 5.5, historicalFloods: 5 },
    'cooum river': { risk: 'high', elevation: 5.3, historicalFloods: 5 },
    'buckingham canal': { risk: 'high', elevation: 5.0, historicalFloods: 5 }
};

// Weather API configuration (mock for now, replace with actual API key)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_weather_api_key';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Get weather forecast (mock implementation)
async function getWeatherForecast(location) {
    // In a real implementation, this would call a weather API
    // For now, we'll return mock data
    const now = new Date();
    const forecast = [];
    
    // Generate 3-day forecast
    for (let i = 0; i < 3; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        
        forecast.push({
            date: date.toISOString().split('T')[0],
            precipitation: Math.floor(Math.random() * 50), // 0-50mm
            temperature: 25 + Math.floor(Math.random() * 10), // 25-35°C
            humidity: 60 + Math.floor(Math.random() * 30), // 60-90%
            windSpeed: 5 + Math.floor(Math.random() * 15), // 5-20 km/h
            conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)]
        });
    }
    
    return forecast;
}

// Get tide information (mock implementation)
function getTideInfo(location, date) {
    // In a real implementation, this would call a tide API
    const tides = [];
    const baseDate = new Date(date);
    
    // Generate tide predictions for the day
    for (let i = 0; i < 4; i++) {
        const time = new Date(baseDate);
        time.setHours(i * 6, 0, 0, 0);
        
        tides.push({
            time: time.toISOString(),
            height: 0.5 + Math.random(), // 0.5m to 1.5m
            type: i % 2 === 0 ? 'High' : 'Low'
        });
    }
    
    return tides;
}

// Predict flood risk for a location
async function predictFloodRisk(location) {
    try {
        // Normalize location name
        const normalizedLocation = location.toLowerCase().trim();
        
        // Get location data
        const locationData = floodZones[normalizedLocation] || {
            risk: 'unknown',
            elevation: 10, // Default elevation if location not found
            historicalFloods: 1
        };
        
        // Get weather forecast
        const forecast = await getWeatherForecast(normalizedLocation);
        
        // Calculate risk score (0-100)
        let riskScore = 0;
        
        // Base risk from historical data
        riskScore += locationData.historicalFloods * 10;
        
        // Elevation factor (lower elevation = higher risk)
        riskScore += (15 - Math.min(locationData.elevation, 15)) * 2;
        
        // Weather factors
        forecast.forEach(day => {
            // Higher precipitation increases risk
            riskScore += day.precipitation * 0.5;
            
            // High humidity increases risk
            if (day.humidity > 80) riskScore += 5;
            
            // Heavy rain conditions increase risk
            if (day.conditions === 'Heavy Rain') riskScore += 10;
        });
        
        // Cap the score at 100
        riskScore = Math.min(100, Math.max(0, riskScore));
        
        // Determine risk level
        let riskLevel;
        if (riskScore >= 70) riskLevel = 'High';
        else if (riskScore >= 40) riskLevel = 'Medium';
        else riskLevel = 'Low';
        
        // Generate prediction for next 3 days
        const predictions = forecast.map((day, index) => ({
            date: day.date,
            riskScore: Math.min(100, riskScore + (index * 5)), // Increase risk each day
            riskLevel: getRiskLevel(riskScore + (index * 5)),
            precipitation: day.precipitation,
            conditions: day.conditions
        }));
        
        return {
            location: location,
            currentRisk: {
                score: riskScore,
                level: riskLevel,
                elevation: locationData.elevation,
                historicalFloods: locationData.historicalFloods
            },
            forecast: predictions,
            timestamp: new Date().toISOString(),
            recommendations: getRecommendations(riskLevel, locationData.elevation)
        };
        
    } catch (error) {
        console.error('Error in predictFloodRisk:', error);
        throw new Error('Failed to predict flood risk');
    }
}

// Helper function to get risk level from score
function getRiskLevel(score) {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
}

// Get safety recommendations based on risk level
function getRecommendations(riskLevel, elevation) {
    const recommendations = [];
    
    if (riskLevel === 'High') {
        recommendations.push(
            '⚠️ High risk of flooding. Consider evacuation if in a low-lying area.',
            'Avoid unnecessary travel through waterlogged areas.',
            'Prepare an emergency kit with essential supplies.',
            'Stay updated with local authorities for evacuation orders.'
        );
    } else if (riskLevel === 'Medium') {
        recommendations.push(
            'Moderate risk of flooding. Stay alert for weather updates.',
            'Avoid crossing flooded roads or walking through moving water.',
            'Keep important documents and emergency supplies ready.',
            'Monitor water levels in your area.'
        );
    } else {
        recommendations.push(
            'Low risk of flooding, but stay informed about weather conditions.',
            'Keep gutters and drains clear of debris.',
            'Have an emergency plan ready in case conditions change.'
        );
    }
    
    if (elevation < 7) {
        recommendations.unshift('⚠️ Your area is in a low-lying region. Be prepared for potential flooding.');
    }
    
    return recommendations;
}

// Get flood risk for a route (multiple locations)
async function getRouteFloodRisk(route) {
    const { from, to } = route;
    const fromRisk = await predictFloodRisk(from);
    const toRisk = await predictFloodRisk(to);
    
    // For simplicity, take the higher risk of the two
    const overallRisk = Math.max(fromRisk.currentRisk.score, toRisk.currentRisk.score);
    
    return {
        from: fromRisk,
        to: toRisk,
        overallRisk: {
            score: overallRisk,
            level: getRiskLevel(overallRisk)
        },
        safeRoute: overallRisk > 50 ? await findAlternativeRoute(route) : null
    };
}

// Find alternative route with lower flood risk
async function findAlternativeRoute(route) {
    // In a real implementation, this would use a routing service
    // For now, we'll return a mock alternative
    const alternatives = {
        't nagar-anna salai': 'Via Nungambakkam (6.8 km, 18 min)',
        'adyar-guindy': 'Via OMR (9.5 km, 25 min)',
        'velachery-thiruvanmiyur': 'Via ECR (8.2 km, 22 min)'
    };
    
    const routeKey = `${route.from.toLowerCase()}-${route.to.toLowerCase()}`;
    return alternatives[routeKey] || 'No alternative route found';
}

// Export functions
module.exports = {
    predictFloodRisk,
    getRouteFloodRisk,
    getWeatherForecast,
    getTideInfo
};
