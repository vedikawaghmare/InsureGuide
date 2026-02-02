import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import {
    MapPin,
    ShieldAlert,
    Droplets,
    Wheat,
    Hospital,
    History,
    ChevronLeft,
    Download,
    AlertTriangle,
    CheckCircle2,
    Volume2
} from "lucide-react";

// Leaflet marker fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, shadowUrl: markerShadow });

/* ---------------- WEATHER SUMMARY ---------------- */
const WeatherSummary = ({ weatherData, locationInfo }) => {
    const { t } = useTranslation();

    if (!weatherData) return null;

    return (
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-4 mb-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    {locationInfo?.name || t('riskMap.currentLocation')}
                </h3>
                <span className="text-2xl font-bold text-blue-700">{Math.round(weatherData.main.temp)}°C</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                    <div className="text-gray-700 font-medium">{t('riskMap.rainfall')}</div>
                    <div className="font-bold text-gray-900">{weatherData.rainfall?.toFixed(1) || '0.0'} mm</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-700 font-medium">{t('riskMap.windSpeed')}</div>
                    <div className="font-bold text-gray-900">{weatherData.wind.speed.toFixed(1)} m/s</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-700 font-medium">{t('riskMap.condition')}</div>
                    <div className="font-bold capitalize text-gray-900">{weatherData.weather[0].description}</div>
                </div>
            </div>
        </div>
    );
};

/* ---------------- POLICY RECOMMENDATIONS ---------------- */
const PolicyRecommendations = ({ recommendations }) => {
    const { t } = useTranslation();

    const priorityBadge = {
        1: "bg-red-100 text-red-800 border-red-200",
        2: "bg-orange-100 text-orange-800 border-orange-200",
        3: "bg-green-100 text-green-800 border-green-200"
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={24} />
                {t('riskMap.recommendedPolicies')}
            </h3>

            <div className="grid gap-4">
                {recommendations.map((plan, index) => (
                    <div
                        key={index}
                        className="border rounded-xl p-4 bg-gray-50 space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-gray-800">
                                {plan.name}
                            </h4>
                            <span
                                className={`text-xs font-bold px-2 py-1 rounded border ${priorityBadge[plan.priority]
                                    }`}
                            >
                                Priority {plan.priority}
                            </span>
                        </div>

                        <p className="text-sm text-gray-800">
                            <b>{t('riskMap.coverage')}:</b> {plan.covers}
                        </p>

                        <p className="text-sm text-blue-800 bg-blue-50 p-2 rounded">
                            <b>{t('riskMap.whyRecommended')}:</b> {plan.reason}
                        </p>

                        <div className="flex justify-between text-sm">
                            <span className="text-green-700 font-bold">
                                {plan.premium}
                            </span>
                            <span className="text-gray-700 font-medium">
                                {plan.benefits}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const RiskCard = ({ icon: Icon, title, riskLevel, reason, history }) => {
    const { t } = useTranslation();
    const colors = {
        HIGH: "border-red-200 text-red-600 bg-red-50",
        MEDIUM: "border-amber-200 text-amber-600 bg-amber-50",
        LOW: "border-emerald-200 text-emerald-600 bg-emerald-50",
    };

    // Voice explanation for statistics with language detection
    const playStatExplanation = (type, value) => {
        if ('speechSynthesis' in window) {
            // Detect current language from Google Translate
            const getCurrentLanguage = () => {
                // Check Google Translate cookie
                const gtCookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
                if (gtCookie) {
                    const lang = gtCookie.split('=')[1].split('/')[2];
                    return lang || 'en';
                }

                // Check if page is translated by looking at Google Translate elements
                const translateElement = document.querySelector('.goog-te-combo');
                if (translateElement && translateElement.value !== 'en') {
                    return translateElement.value;
                }

                // Check HTML lang attribute
                return document.documentElement.lang || 'en';
            };

            const currentLang = getCurrentLanguage();

            // Multilingual explanations
            const explanations = {
                'en': {
                    affected: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `Out of 10 families in this area, about ${outOf10} families face this problem`;
                    },
                    insured: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `Out of 10 families, ${outOf10} families have insurance protection`;
                    }
                },
                'hi': {
                    affected: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 परिवारों में से लगभग ${outOf10} परिवारों को यह समस्या होती है`;
                    },
                    insured: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 परिवारों में से ${outOf10} परिवारों के पास बीमा सुरक्षा है`;
                    }
                },
                'mr': {
                    affected: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 कुटुंबांपैकी सुमारे ${outOf10} कुटुंबांना ही समस्या आहे`;
                    },
                    insured: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 कुटुंबांपैकी ${outOf10} कुटुंबांकडे विमा संरक्षण आहे`;
                    }
                },
                'gu': {
                    affected: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 પરિવારોમાંથી લગભગ ${outOf10} પરિવારોને આ સમસ્યા છે`;
                    },
                    insured: (val) => {
                        const percentage = parseInt(val);
                        const outOf10 = Math.round(percentage / 10);
                        return `10 પરિવારોમાંથી ${outOf10} પરિવારો પાસે વીમા સુરક્ષા છે`;
                    }
                }
            };

            const langExplanations = explanations[currentLang] || explanations['en'];
            let explanation = "";

            if (type === 'affected' && langExplanations.affected) {
                explanation = langExplanations.affected(value);
            } else if (type === 'insured' && langExplanations.insured) {
                explanation = langExplanations.insured(value);
            }

            if (explanation) {
                const utterance = new SpeechSynthesisUtterance(explanation);

                // Language-specific voice settings
                const voiceSettings = {
                    'en': { lang: 'en-IN', rate: 0.8 },
                    'hi': { lang: 'hi-IN', rate: 0.7 },
                    'mr': { lang: 'mr-IN', rate: 0.7 },
                    'gu': { lang: 'gu-IN', rate: 0.7 },
                    'ta': { lang: 'ta-IN', rate: 0.7 },
                    'te': { lang: 'te-IN', rate: 0.7 },
                    'bn': { lang: 'bn-IN', rate: 0.7 },
                    'kn': { lang: 'kn-IN', rate: 0.7 }
                };

                const voiceSetting = voiceSettings[currentLang] || voiceSettings['en'];
                utterance.lang = voiceSetting.lang;
                utterance.rate = voiceSetting.rate;

                // Try to find appropriate voice
                const voices = window.speechSynthesis.getVoices();
                const preferredVoice = voices.find(voice =>
                    voice.lang.includes(voiceSetting.lang) ||
                    voice.lang.includes(currentLang)
                );

                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                }

                console.log(`Speaking in ${currentLang}:`, explanation);
                window.speechSynthesis.speak(utterance);
            }
        }
    };

    // Convert percentage to simple sentence
    const getSimpleStat = (type, value) => {
        if (type === 'affected') {
            const percentage = parseInt(value);
            const outOf10 = Math.round(percentage / 10);
            return `${outOf10} out of 10 families affected`;
        } else if (type === 'insured') {
            const percentage = parseInt(value);
            const outOf10 = Math.round(percentage / 10);
            return `${outOf10} out of 10 families protected`;
        }
        return value;
    };

    return (
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl border ${colors[riskLevel]}`}>
                    <Icon size={24} />
                </div>
                <div className="flex-1 flex justify-between">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <span className={`text-[10px] font-black px-2 py-1 rounded border ${colors[riskLevel]}`}>
                        {riskLevel}
                    </span>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <AlertTriangle size={16} className="inline mr-2 text-gray-600" />
                <strong className="text-gray-900">Why this matters:</strong> <span className="text-gray-800">{reason}</span>
            </div>

            <div className="grid grid-cols-3 text-xs text-gray-700 gap-2">
                <div className="text-center">
                    <History size={12} className="mx-auto mb-1 text-gray-600" />
                    <div className="font-bold text-gray-900">{history.date}</div>
                    <div className="text-gray-600">Time period</div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => playStatExplanation('affected', history.affected)}
                        className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded transition-colors"
                    >
                        <Volume2 size={12} className="text-orange-600" />
                        <div className="font-bold text-orange-700">
                            {getSimpleStat('affected', history.affected)}
                        </div>
                        <div className="text-gray-600">Families at risk</div>
                    </button>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => playStatExplanation('insured', history.insured)}
                        className="flex flex-col items-center gap-1 hover:bg-gray-100 p-2 rounded transition-colors"
                    >
                        <Volume2 size={12} className="text-emerald-600" />
                        <div className="font-bold text-emerald-700">
                            {getSimpleStat('insured', history.insured)}
                        </div>
                        <div className="text-gray-600">Have insurance</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */
function RiskMap() {
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const { t } = useTranslation();

    const [position, setPosition] = useState(null);
    const [riskData, setRiskData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analysisLoading, setAnalysisLoading] = useState(false);

    /* GET USER LOCATION */
    const getLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                setPosition(coords);
                setLoading(false);

                if (mapRef.current) {
                    mapRef.current.setView(coords, 13);
                }

                // Fetch weather and risk data for current location
                fetchLocationData(coords);
            },
            () => {
                const fallbackCoords = [18.5204, 73.8567]; // Pune fallback
                setPosition(fallbackCoords);
                setLoading(false);
                fetchLocationData(fallbackCoords, 'Pune');
            }
        );
    };

    /* SEARCH LOCATION */
    const searchLocation = async (locationName) => {
        if (!locationName.trim()) return;

        setLoading(true);
        try {
            // Using OpenStreetMap Nominatim API for geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                setPosition(coords);

                if (mapRef.current) {
                    mapRef.current.setView(coords, 13);
                }

                // Fetch weather and risk data for searched location
                fetchLocationData(coords, data[0].display_name);
            } else {
                alert(t('riskMap.locationNotFound'));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert(t('riskMap.searchError'));
        }
        setLoading(false);
    };

    /* FIRST LOAD */
    useEffect(() => {
        getLocation();
    }, []);

    /* FETCH WEATHER AND RISK DATA */
    const fetchLocationData = async (coords, locationName = null) => {
        setAnalysisLoading(true);
        try {
            console.log('Fetching location data for:', coords, locationName);
            
            // Use enhanced backend API with real location data
            const response = await fetch(
                `http://localhost:5000/api/risk?lat=${coords[0]}&lon=${coords[1]}&district=${encodeURIComponent(locationName || 'Unknown')}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const apiData = await response.json();
            console.log('API Response:', apiData);

            if (apiData.error) {
                throw new Error(apiData.message || 'API Error');
            }

            // Use REAL weather data from Open-Meteo API
            const weatherData = {
                main: {
                    temp: apiData.weather?.temperature || 25,
                    humidity: apiData.weather?.humidity || 60,
                    pressure: 1013
                },
                weather: [{
                    main: apiData.weather?.condition === 'rain' ? 'Rain' : apiData.weather?.condition === 'clear' ? 'Clear' : 'Clouds',
                    description: apiData.weather?.condition || 'partly cloudy'
                }],
                wind: { speed: apiData.weather?.windSpeed || 3 },
                name: apiData.summary?.location || locationName || 'Current Location',
                rainfall: apiData.weather?.rainfall_mm || 0
            };

            // Analyze comprehensive risk using REAL API data
            const riskAnalysis = analyzeLocationRisk(apiData);

            setWeatherData(weatherData);
            setRiskData({
                ...riskAnalysis,
                demographics: apiData.demographics,
                summary: apiData.summary,
                recommendations: apiData.recommendedPlans || []
            });
            setLocationInfo({ 
                name: apiData.summary?.location || locationName || 'Current Location', 
                coords,
                overallRisk: apiData.summary?.overallRisk,
                keyRisks: apiData.summary?.keyRisks
            });

        } catch (error) {
            console.error('Error fetching location data:', error);
            
            // Show user-friendly error message
            const errorMessage = error.message.includes('Failed to fetch') 
                ? 'Unable to connect to server. Please check if the backend is running on port 5000.'
                : `API Error: ${error.message}`;
                
            alert(errorMessage);
            
            // Set fallback data to prevent blank screen
            setWeatherData({
                main: { temp: 25, humidity: 60, pressure: 1013 },
                weather: [{ main: 'Clear', description: 'clear sky' }],
                wind: { speed: 3 },
                name: locationName || 'Current Location',
                rainfall: 0
            });
            
        } finally {
            setAnalysisLoading(false);
        }
    };

    /* ANALYZE LOCATION RISK USING REAL DATA */
    const analyzeLocationRisk = (apiData) => {
        return {
            weather: {
                floodRisk: apiData.weather.floodRisk,
                heatRisk: apiData.weather.heatRisk,
                droughtRisk: apiData.weather.droughtRisk
            },
            agriculture: {
                cropRisk:
                    apiData.weather.floodRisk === 'HIGH' ||
                        apiData.weather.droughtRisk === 'HIGH'
                        ? 'HIGH'
                        : 'LOW',

                soilRisk:
                    apiData.soil?.fertilityRisk === 'HIGH' ||
                        apiData.soil?.soilHealth === 'POOR'
                        ? 'HIGH'
                        : apiData.soil?.fertilityRisk === 'MEDIUM'
                            ? 'MEDIUM'
                            : 'LOW'
            },
            infrastructure: {
                healthAccess: 'GOOD'
            },

            // ✅ ONLY use backend recommendations
            recommendations: apiData.recommendedPlans || []
        };
    };


    if (loading || !position) {
        return <div className="h-screen flex items-center justify-center font-bold">{t('riskMap.loadingMap')}</div>;
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            {/* HEADER & SEARCH */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="text-blue-600" />
                    {t('riskMap.title')}
                </h1>

                <div className="flex gap-2 w-full md:w-auto min-w-[500px]">
                    <input
                        type="text"
                        placeholder={t('riskMap.searchPlaceholder')}
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 bg-white text-slate-900 placeholder-slate-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchLocation(e.target.value);
                            }
                        }}
                    />
                    <button
                        onClick={getLocation}
                        className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                        title={t('riskMap.myLocation')}
                    >
                        <MapPin size={20} />
                    </button>
                    <button
                        className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors"
                        title="Download Report"
                    >
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* SPLIT CONTENT */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

                {/* LEFT COL: MAP (Takes up remaining height) */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
                    {/* Map Legend */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 z-[1000] text-xs border border-slate-200">
                        <h4 className="font-bold mb-2 text-slate-800">{t('riskMap.riskZones')}</h4>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
                                <span className="text-slate-600 font-medium">{t('riskMap.highRiskFlood')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></span>
                                <span className="text-slate-600 font-medium">{t('riskMap.mediumRiskCrop')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span>
                                <span className="text-slate-600 font-medium">{t('riskMap.healthFacilities')}</span>
                            </div>
                        </div>
                    </div>

                    <MapContainer
                        center={position}
                        zoom={13}
                        className="h-full w-full"
                        whenCreated={(map) => (mapRef.current = map)}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position} />

                        {riskData && (
                            <>
                                {/* Flood Risk Circle */}
                                <Circle
                                    center={position}
                                    radius={2000}
                                    pathOptions={{
                                        color: riskData.weather.floodRisk === "HIGH" ? "#ef4444" : riskData.weather.floodRisk === "MEDIUM" ? "#f97316" : "#22c55e",
                                        fillColor: riskData.weather.floodRisk === "HIGH" ? "#ef4444" : riskData.weather.floodRisk === "MEDIUM" ? "#f97316" : "#22c55e",
                                        fillOpacity: 0.2,
                                        weight: 2
                                    }}
                                />

                                {/* Crop Risk Circle */}
                                <Circle
                                    center={[position[0] + 0.01, position[1] + 0.01]}
                                    radius={1500}
                                    pathOptions={{
                                        color: riskData.agriculture.cropRisk === "HIGH" ? "#ef4444" : riskData.agriculture.cropRisk === "MEDIUM" ? "#f97316" : "#22c55e",
                                        fillColor: riskData.agriculture.cropRisk === "HIGH" ? "#ef4444" : riskData.agriculture.cropRisk === "MEDIUM" ? "#f97316" : "#22c55e",
                                        fillOpacity: 0.15,
                                        weight: 2
                                    }}
                                />

                                {/* Health Access Circle */}
                                <Circle
                                    center={[position[0] - 0.01, position[1] - 0.01]}
                                    radius={1000}
                                    pathOptions={{
                                        color: riskData.infrastructure.healthAccess === "GOOD" ? "#22c55e" : "#f97316",
                                        fillColor: riskData.infrastructure.healthAccess === "GOOD" ? "#22c55e" : "#f97316",
                                        fillOpacity: 0.1,
                                        weight: 2
                                    }}
                                />
                            </>
                        )}
                    </MapContainer>
                </div>

                {/* RIGHT COL: CONTENT (Scrollable) */}
                <div className="lg:col-span-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 h-full">
                    {/* WEATHER SUMMARY */}
                    {weatherData && (
                        <WeatherSummary weatherData={weatherData} locationInfo={locationInfo} />
                    )}

                    {analysisLoading && (
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-slate-600">{t('riskMap.analyzingRisk')}</p>
                        </div>
                    )}

                    {/* RISK CARDS */}
                    {riskData && (
                        <div className="space-y-4">
                            <RiskCard
                                icon={Droplets}
                                title={t('riskMap.floodRisk')}
                                riskLevel={riskData.weather.floodRisk}
                                reason={riskData.weather.floodRisk === 'HIGH' ? t('riskMap.highFloodReason') : t('riskMap.lowFloodReason')}
                                history={{ date: t('riskMap.currentSeason'), affected: weatherData?.main.humidity + '%', insured: '65%' }}
                            />

                            <RiskCard
                                icon={Wheat}
                                title={t('riskMap.cropRisk')}
                                riskLevel={riskData.agriculture.cropRisk}
                                reason={riskData.agriculture.cropRisk === 'HIGH' ? t('riskMap.highCropReason') : t('riskMap.lowCropReason')}
                                history={{ date: t('riskMap.thisYear'), affected: Math.round(weatherData?.main.temp) + '°C', insured: '45%' }}
                            />

                            <RiskCard
                                icon={Hospital}
                                title={t('riskMap.healthAccess')}
                                riskLevel={riskData.infrastructure.healthAccess === 'GOOD' ? 'LOW' : 'HIGH'}
                                reason={t('riskMap.healthAccessReason')}
                                history={{ date: t('riskMap.always'), affected: t('riskMap.notApplicable'), insured: '78%' }}
                            />
                        </div>
                    )}

                    {/* POLICY RECOMMENDATIONS */}
                    {riskData?.recommendations && riskData.recommendations.length > 0 && (
                        <PolicyRecommendations
                            recommendations={riskData.recommendations}
                        />
                    )}

                    {/* AREA RISK SUMMARY (Moved from bottom) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ShieldAlert className="text-blue-600" size={20} />
                            {t('riskMap.riskAssessment')}
                        </h3>
                        {/* Compact version of the bottom summary */}
                        <div className="space-y-3">
                            <div className="bg-red-50 border-l-4 border-red-500 rounded p-3">
                                <h4 className="font-semibold text-red-800 text-sm">Weather Risk</h4>
                                <p className="text-xs text-red-700 mt-1">{t('riskMap.weatherRiskDesc')}</p>
                            </div>
                            {/* ... can add more here if needed, but keeping it clean for right rail */}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default RiskMap;
