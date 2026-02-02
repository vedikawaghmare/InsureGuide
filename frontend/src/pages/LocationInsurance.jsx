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
        <div className="min-h-screen bg-cool-grey p-8 font-sans">
            {/* HEADER */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl transition-all"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Geo-Risk Intelligence</h1>
                        <p className="text-slate-500 font-medium">Hyper-local insurance recommendations based on your environment.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100 flex items-center gap-3">
                        <MapPin className="text-blue-600" size={20} />
                        <span className="text-sm font-black text-blue-700 uppercase tracking-wider">{location.district || "Awaiting Location"}</span>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* MAIN CONTENT AREA */}
                <div className="lg:col-span-3 space-y-8">

                    {/* INPUT SECTION */}
                    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <h2 className="text-xl font-black text-slate-900">Define Your Location</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Latitude</p>
                                        <input
                                            type="number"
                                            value={location.lat}
                                            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                                            placeholder="18.5204"
                                            className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-slate-900 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Longitude</p>
                                        <input
                                            type="number"
                                            value={location.lon}
                                            onChange={(e) => setLocation({ ...location, lon: e.target.value })}
                                            placeholder="73.8567"
                                            className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-slate-900 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District/City</p>
                                        <input
                                            type="text"
                                            value={location.district}
                                            onChange={(e) => setLocation({ ...location, district: e.target.value })}
                                            placeholder="Pune"
                                            className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-slate-900 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end gap-3 min-w-[200px]">
                                <button
                                    onClick={getCurrentLocation}
                                    disabled={loading}
                                    className="h-14 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <MapPin size={20} /> Detect Me
                                </button>
                                <button
                                    onClick={getRecommendations}
                                    disabled={loading || !location.lat || !location.lon}
                                    className="h-14 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                                >
                                    {loading ? <Loader className="animate-spin" /> : <Shield size={20} />}
                                    Analyze Risks
                                </button>
                            </div>
                        </div>
                        {error && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
                    </div>

                    {/* RESULTS SECTION */}
                    {recommendations ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            {/* RISK TILES */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: 'Weather Risk', value: recommendations.riskSummary.weatherRisk, icon: <Shield /> },
                                    { label: 'Soil Health', value: recommendations.riskSummary.soilRisk, icon: <Loader /> },
                                    { label: 'Disaster Risk', value: recommendations.riskSummary.disasterRisk, icon: <AlertTriangle /> }
                                ].map((risk, idx) => (
                                    <div key={idx} className={`p-8 rounded-[40px] border-2 flex flex-col items-center text-center gap-4 transition-all hover:scale-105 ${getRiskStyle(risk.value)}`}>
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                            {React.cloneElement(getRiskIcon(risk.value), { size: 32 })}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{risk.label}</p>
                                            <p className="text-2xl font-black tracking-tight">{risk.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PLAN GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {recommendations.recommendedPlans.map((plan, index) => (
                                    <div key={index} className="bg-white border-2 border-slate-100 rounded-[40px] p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Shield size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 leading-none">{plan.name}</h3>
                                                <p className="text-sm font-bold text-green-600 mt-2">{plan.premium}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Why Recommended</p>
                                                <p className="text-sm font-bold text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                    {plan.reason}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Covers</p>
                                                    <p className="text-xs font-bold text-slate-900">{plan.covers}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Benefit</p>
                                                    <p className="text-xs font-bold text-slate-900">{plan.benefits}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full mt-8 h-14 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-900 rounded-2xl font-black transition-all">
                                            Apply for Coverage
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-[400px] bg-white border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center text-center p-10">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Search size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-300">Awaiting Intelligence Analysis</h3>
                            <p className="text-slate-400 max-w-xs font-medium mt-2">Provide your location details above to unlock hyper-local insurance risk assessments.</p>
                        </div>
                    )}
                </div>

                {/* AREA ANALYTICS SIDEBAR */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xl font-black mb-6 relative z-10 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Area Insights
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-sm font-bold opacity-50">Local Climate</span>
                                <span className="font-black">Sub-Tropical</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-sm font-bold opacity-50">Flood History</span>
                                <span className="font-black text-yellow-400">Moderate</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-sm font-bold opacity-50">Soil Fertility</span>
                                <span className="font-black text-emerald-400">High</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold opacity-50">Agent Density</span>
                                <span className="font-black">10+ Nearby</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate("/risk-map")}
                            className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-sm transition-all border border-white/5"
                        >
                            Open Interactive Map
                        </button>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-4">Risk Disclaimer</h4>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                            * Recommendations are based on historical environmental data and current satellite imagery. Premium rates may vary based on actual on-field inspection by our agents.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/home")}
                        className="w-full py-4 text-slate-400 font-bold hover:text-slate-900 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationInsurance;