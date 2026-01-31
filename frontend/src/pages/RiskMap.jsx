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
    CheckCircle2
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
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    {locationInfo?.name || t('riskMap.currentLocation')}
                </h3>
                <span className="text-2xl font-bold text-blue-600">{Math.round(weatherData.main.temp)}°C</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                    <div className="text-gray-600">{t('riskMap.rainfall')}</div>
                    <div className="font-bold">{weatherData.rainfall?.toFixed(1) || '0.0'} mm</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-600">{t('riskMap.windSpeed')}</div>
                    <div className="font-bold">{weatherData.wind.speed.toFixed(1)} m/s</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-600">{t('riskMap.condition')}</div>
                    <div className="font-bold capitalize">{weatherData.weather[0].description}</div>
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
                                className={`text-xs font-bold px-2 py-1 rounded border ${
                                    priorityBadge[plan.priority]
                                }`}
                            >
                                Priority {plan.priority}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">
                            <b>{t('riskMap.coverage')}:</b> {plan.covers}
                        </p>

                        <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                            <b>{t('riskMap.whyRecommended')}:</b> {plan.reason}
                        </p>

                        <div className="flex justify-between text-sm">
                            <span className="text-green-600 font-bold">
                                {plan.premium}
                            </span>
                            <span className="text-gray-500">
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
                <AlertTriangle size={16} className="inline mr-2 text-gray-400" />
                <strong>{t('riskMap.reason')}</strong> {reason}
            </div>

            <div className="grid grid-cols-3 text-xs text-gray-600">
                <div>
                    <History size={12} /> <b>{history.date}</b>
                </div>
                <div>
                    {t('riskMap.affected')}: <b>{history.affected}</b>
                </div>
                <div className="text-emerald-600">
                    {t('riskMap.insured')}: <b>{history.insured}</b>
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
            // Use your enhanced backend API with real dynamic data
            const response = await fetch(
                `http://localhost:5000/api/risk?lat=${coords[0]}&lon=${coords[1]}&district=${locationName || 'Unknown'}`
            );
            const apiData = await response.json();

            // Use REAL weather data from Open-Meteo API
            const weatherData = {
                main: {
                    temp: apiData.weather.temperature,
                    humidity: apiData.weather.humidity,
                    pressure: 1013
                },
                weather: [{
                    main: apiData.weather.condition === 'rain' ? 'Rain' : 'Clear',
                    description: apiData.weather.condition === 'rain' ? 'rainy conditions' : 'clear conditions'
                }],
                wind: { speed: apiData.weather.windSpeed },
                name: locationName || 'Current Location',
                rainfall: apiData.weather.rainfall_mm
            };

            // Analyze comprehensive risk using REAL API data
            const riskAnalysis = analyzeLocationRisk(apiData, coords);

            setWeatherData(weatherData);
            setRiskData(riskAnalysis);
            setLocationInfo({ name: locationName || 'Current Location', coords });

        } catch (error) {
            console.error('Error fetching location data:', error);
            alert(t('riskMap.apiError'));
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
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 pr-20">
                <ChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
                <h1 className="font-bold">{t('riskMap.title')}</h1>
                <Download size={18} />
            </div>

            {/* PRIVATE VIEW */}
            <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs flex gap-2">
                <ShieldAlert size={14} /> {t('riskMap.privateView')}
            </div>

            <div className="max-w-5xl mx-auto p-4 space-y-6">


                {/* SEARCH / LOCATION */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={t('riskMap.searchPlaceholder')}
                        className="flex-1 border-2 rounded-xl px-4 py-3 bg-white"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchLocation(e.target.value);
                            }
                        }}
                    />
                    <button
                        onClick={getLocation}
                        className="bg-zinc-900 text-white px-4 py-3 rounded-xl flex gap-2"
                    >
                        <MapPin size={18} /> {t('riskMap.myLocation')}
                    </button>
                </div>

                {/* MAP */}
                <div className="h-[60vh] rounded-3xl overflow-hidden border shadow-lg relative">
                    {/* Map Legend */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-[1000] text-xs">
                        <h4 className="font-bold mb-2">{t('riskMap.riskZones')}</h4>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>{t('riskMap.highRiskFlood')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span>{t('riskMap.mediumRiskCrop')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>{t('riskMap.healthFacilities')}</span>
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
                                        color: riskData.weather.floodRisk === "HIGH" ? "red" : riskData.weather.floodRisk === "MEDIUM" ? "orange" : "green",
                                        fillColor: riskData.weather.floodRisk === "HIGH" ? "red" : riskData.weather.floodRisk === "MEDIUM" ? "orange" : "green",
                                        fillOpacity: 0.2,
                                        weight: 3
                                    }}
                                />

                                {/* Crop Risk Circle */}
                                <Circle
                                    center={[position[0] + 0.01, position[1] + 0.01]}
                                    radius={1500}
                                    pathOptions={{
                                        color: riskData.agriculture.cropRisk === "HIGH" ? "red" : riskData.agriculture.cropRisk === "MEDIUM" ? "orange" : "green",
                                        fillColor: riskData.agriculture.cropRisk === "HIGH" ? "red" : riskData.agriculture.cropRisk === "MEDIUM" ? "orange" : "green",
                                        fillOpacity: 0.15,
                                        weight: 2
                                    }}
                                />

                                {/* Health Access Circle */}
                                <Circle
                                    center={[position[0] - 0.01, position[1] - 0.01]}
                                    radius={1000}
                                    pathOptions={{
                                        color: riskData.infrastructure.healthAccess === "GOOD" ? "green" : "orange",
                                        fillColor: riskData.infrastructure.healthAccess === "GOOD" ? "green" : "orange",
                                        fillOpacity: 0.1,
                                        weight: 2
                                    }}
                                />
                            </>
                        )}
                    </MapContainer>
                </div>

                {/* WEATHER SUMMARY */}
                {weatherData && (
                    <WeatherSummary weatherData={weatherData} locationInfo={locationInfo} />
                )}

                {analysisLoading && (
                    <div className="bg-white rounded-2xl p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600">{t('riskMap.analyzingRisk')}</p>
                    </div>
                )}

                {/* RISK CARDS */}
                {riskData && (
                    <>
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
                    </>
                )}

                {/* POLICY RECOMMENDATIONS */}
                {riskData?.recommendations && riskData.recommendations.length > 0 && (
                    <PolicyRecommendations
                        recommendations={riskData.recommendations}
                    />
                )}

                {/* BACK TO CHAT */}
                <button
                    onClick={() => navigate("/home")}
                    className="w-full py-4 text-gray-600 flex justify-center gap-2 font-bold"
                >
                    <ChevronLeft size={18} /> {t('riskMap.backTo')}
                </button>

                {/* AREA RISK SUMMARY */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShieldAlert className="text-blue-600" size={24} />
                        {t('riskMap.riskAssessment')}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Droplets className="text-red-600 mr-2" size={20} />
                                <h4 className="font-semibold text-red-800">{t('riskMap.weatherRisk')}</h4>
                            </div>
                            <p className="text-sm text-red-700 mb-2">{t('riskMap.weatherRiskDesc')}</p>
                            <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">{t('riskMap.highRisk')}</span>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <AlertTriangle className="text-orange-600 mr-2" size={20} />
                                <h4 className="font-semibold text-orange-800">{t('riskMap.accidentRisk')}</h4>
                            </div>
                            <p className="text-sm text-orange-700 mb-2">{t('riskMap.accidentRiskDesc')}</p>
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">{t('riskMap.mediumRisk')}</span>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Hospital className="text-green-600 mr-2" size={20} />
                                <h4 className="font-semibold text-green-800">{t('riskMap.healthAccessTitle')}</h4>
                            </div>
                            <p className="text-sm text-green-700 mb-2">{t('riskMap.healthAccessDesc')}</p>
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">{t('riskMap.goodAccess')}</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-blue-600" size={20} />
                            {t('riskMap.recommendedCoverage')}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                                <div className="flex items-center gap-2">
                                    <Wheat className="text-green-600" size={16} />
                                    <span className="text-sm font-medium">{t('riskMap.cropInsuranceTitle')}</span>
                                </div>
                                <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-1 rounded">{t('riskMap.priority')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-blue-600" size={16} />
                                    <span className="text-sm font-medium">{t('riskMap.vehicleInsurance')}</span>
                                </div>
                                <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded">{t('riskMap.recommended')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="text-purple-600" size={16} />
                                    <span className="text-sm font-medium">{t('riskMap.homeInsurance')}</span>
                                </div>
                                <span className="text-xs bg-yellow-100 text-yellow-800 font-bold px-2 py-1 rounded">{t('riskMap.suggested')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2">
                                    <Hospital className="text-red-600" size={16} />
                                    <span className="text-sm font-medium">{t('riskMap.healthInsurance')}</span>
                                </div>
                                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">{t('riskMap.essential')}</span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-blue-500">
                            <p className="text-sm text-gray-700">
                                {t('riskMap.tip')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiskMap;
