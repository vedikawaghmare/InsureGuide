import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

/* ---------------- RISK CARD ---------------- */
const RiskCard = ({ icon: Icon, title, riskLevel, reason, history }) => {
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
                <strong>Reason:</strong> {reason}
            </div>

            <div className="grid grid-cols-3 text-xs text-gray-600">
                <div>
                    <History size={12} /> <b>{history.date}</b>
                </div>
                <div>
                    Affected: <b>{history.affected}</b>
                </div>
                <div className="text-emerald-600">
                    Insured: <b>{history.insured}</b>
                </div>
            </div>
        </div>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */
function RiskMap() {
    const navigate = useNavigate();
    const mapRef = useRef(null);

    const [position, setPosition] = useState(null);
    const [riskData, setRiskData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            },
            () => {
                setPosition([18.5204, 73.8567]); // Pune fallback
                setLoading(false);
            }
        );
    };

    /* FIRST LOAD */
    useEffect(() => {
        getLocation();
    }, []);

    /* FETCH RISK DATA */
    useEffect(() => {
        if (!position) return;

        fetch(
            `http://localhost:5000/api/risk?lat=${position[0]}&lon=${position[1]}&district=Pune`
        )
            .then(res => res.json())
            .then(data => setRiskData(data));
    }, [position]);

    if (loading || !position) {
        return <div className="h-screen flex items-center justify-center font-bold">Loading Map...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <ChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
                <h1 className="font-bold">Village Risk Map</h1>
                <Download size={18} />
            </div>

            {/* PRIVATE VIEW */}
            <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs flex gap-2">
                <ShieldAlert size={14} /> Private View: This risk data is visible only to you. Your village name is not shared publicly.
            </div>

            <div className="max-w-5xl mx-auto p-4 space-y-6">


                {/* SEARCH / LOCATION */}
                <div className="flex gap-2">
                    <input
                        value="Your Location"
                        readOnly
                        className="flex-1 border-2 rounded-xl px-4 py-3 bg-white"
                    />
                    <button
                        onClick={getLocation}
                        className="bg-zinc-900 text-white px-4 py-3 rounded-xl flex gap-2"
                    >
                        <MapPin size={18} /> My Location
                    </button>
                </div>

                {/* MAP */}
                <div className="h-[60vh] rounded-3xl overflow-hidden border shadow-lg">

                    <MapContainer
                        center={position}
                        zoom={13}
                        className="h-full w-full"
                        whenCreated={(map) => (mapRef.current = map)}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position} />

                        {riskData && (
                            <Circle
                                center={position}
                                radius={2000}
                                pathOptions={{
                                    color:
                                        riskData.weather.floodRisk === "HIGH"
                                            ? "red"
                                            : "orange",
                                    fillOpacity: 0.25,
                                }}
                            />
                        )}
                    </MapContainer>
                </div>

                {/* RISK CARDS */}
                <RiskCard
                    icon={Droplets}
                    title="Flood Risk"
                    riskLevel={riskData?.weather?.floodRisk || "HIGH"}
                    reason="Heavy monsoon & nearby river"
                    history={{ date: "Aug 2022", affected: "45", insured: "30" }}
                />

                <RiskCard
                    icon={Wheat}
                    title="Crop Loss"
                    riskLevel={riskData?.soil?.soilRisk || "MEDIUM"}
                    reason="Unseasonal rain and drought"
                    history={{ date: "Jun 2023", affected: "28", insured: "12" }}
                />

                <RiskCard
                    icon={Hospital}
                    title="Health Facilities"
                    riskLevel="LOW"
                    reason="PHC nearby & district hospital"
                    history={{ date: "Always", affected: "N/A", insured: "90%" }}
                />

                {/* BACK TO CHAT */}
                <button
                    onClick={() => navigate("/home")}
                    className="w-full py-4 text-gray-600 flex justify-center gap-2 font-bold"
                >
                    <ChevronLeft size={18} /> Back to
                </button>
            </div>
        </div>
    );
}

export default RiskMap;
