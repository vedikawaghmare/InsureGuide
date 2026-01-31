import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Shield, AlertTriangle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';

function LocationInsurance() {
    const [location, setLocation] = useState({ lat: '', lon: '', district: '' });
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get user's current location
    const getCurrentLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude.toFixed(4),
                        lon: position.coords.longitude.toFixed(4),
                        district: 'Auto-detected'
                    });
                    setLoading(false);
                },
                (error) => {
                    setError('Unable to get your location. Please enter manually.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation not supported by this browser.');
            setLoading(false);
        }
    };

    // Get insurance recommendations
    const getRecommendations = async () => {
        if (!location.lat || !location.lon) {
            setError('Please provide location coordinates');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `http://localhost:5000/api/insurance/recommendations?lat=${location.lat}&lon=${location.lon}&district=${location.district}`
            );
            const data = await response.json();

            if (response.ok) {
                setRecommendations(data);
            } else {
                setError(data.message || 'Failed to get recommendations');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    // Risk level styling
    const getRiskStyle = (risk) => {
        switch (risk) {
            case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRiskIcon = (risk) => {
        switch (risk) {
            case 'HIGH': return <AlertTriangle className="w-4 h-4" />;
            case 'MEDIUM': return <Shield className="w-4 h-4" />;
            case 'LOW': return <CheckCircle className="w-4 h-4" />;
            default: return <Shield className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Insurance for Your Location</h1>
                            <p className="text-gray-600">Get personalized insurance recommendations based on your area's risks</p>
                        </div>
                    </div>

                    {/* Location Input */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                            <input
                                type="number"
                                step="0.0001"
                                value={location.lat}
                                onChange={(e) => setLocation({...location, lat: e.target.value})}
                                placeholder="18.5204"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                            <input
                                type="number"
                                step="0.0001"
                                value={location.lon}
                                onChange={(e) => setLocation({...location, lon: e.target.value})}
                                placeholder="73.8567"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <input
                                type="text"
                                value={location.district}
                                onChange={(e) => setLocation({...location, district: e.target.value})}
                                placeholder="Pune"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex flex-col justify-end">
                            <button
                                onClick={getCurrentLocation}
                                disabled={loading}
                                className="mb-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                <MapPin size={16} />
                                Use My Location
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={getRecommendations}
                            disabled={loading || !location.lat || !location.lon}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Shield size={16} />}
                            {loading ? 'Analyzing...' : 'Get Insurance Recommendations'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    )}
                </div>

                {/* Results */}
                {recommendations && (
                    <div className="space-y-6">
                        {/* Risk Summary */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Assessment for Your Area</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={`p-4 rounded-lg border-2 ${getRiskStyle(recommendations.riskSummary.weatherRisk)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getRiskIcon(recommendations.riskSummary.weatherRisk)}
                                        <span className="font-semibold">Weather Risk</span>
                                    </div>
                                    <p className="text-sm">{recommendations.riskSummary.weatherRisk}</p>
                                </div>
                                <div className={`p-4 rounded-lg border-2 ${getRiskStyle(recommendations.riskSummary.soilRisk)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getRiskIcon(recommendations.riskSummary.soilRisk)}
                                        <span className="font-semibold">Soil Risk</span>
                                    </div>
                                    <p className="text-sm">{recommendations.riskSummary.soilRisk}</p>
                                </div>
                                <div className={`p-4 rounded-lg border-2 ${getRiskStyle(recommendations.riskSummary.disasterRisk)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getRiskIcon(recommendations.riskSummary.disasterRisk)}
                                        <span className="font-semibold">Disaster Risk</span>
                                    </div>
                                    <p className="text-sm">{recommendations.riskSummary.disasterRisk}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Plans */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Insurance Plans</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendations.recommendedPlans.map((plan, index) => (
                                    <div key={index} className="border-2 border-blue-100 rounded-xl p-6 hover:border-blue-300 transition-colors">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Shield className="w-6 h-6 text-blue-600" />
                                            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">What it covers:</p>
                                                <p className="text-sm text-gray-600">{plan.covers}</p>
                                            </div>
                                            
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Why recommended:</p>
                                                <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">{plan.reason}</p>
                                            </div>
                                            
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Premium:</p>
                                                <p className="text-sm font-bold text-green-600">{plan.premium}</p>
                                            </div>
                                            
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Benefits:</p>
                                                <p className="text-sm text-gray-600">{plan.benefits}</p>
                                            </div>
                                        </div>
                                        
                                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationInsurance;