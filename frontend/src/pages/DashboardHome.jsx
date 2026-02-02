import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
    Shield, Users, Wifi, Phone, Play, MapPin, FileText, CheckCircle,
    Sun, CloudRain, Wind, AlertTriangle, Sprout, Landmark, FileCheck
} from "lucide-react";
import SustainabilityTip from "../components/SustainabilityTip";

/* --- NEW WIDGETS --- */

const WeatherWidget = () => (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sun size={100} />
        </div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-blue-100 text-sm uppercase tracking-wider">Today's Weather</h3>
                    <p className="text-3xl font-bold mt-1">28°C</p>
                    <p className="text-blue-100 flex items-center gap-2 mt-1">
                        <Sun size={16} /> Sunny, Clear Sky
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-blue-100 text-xs">Humidity</p>
                    <p className="font-bold">65%</p>
                </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-400 rounded-lg text-yellow-900">
                        <Sprout size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Farming Advisory</p>
                        <p className="text-xs text-blue-50 mt-0.5 leading-relaxed">
                            Good conditions for sowing wheat. Ensure proper irrigation this week.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const PolicyStatusCard = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 mb-6 transition-colors transition-all">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="text-green-600" size={20} />
                My Insurance
            </h3>

            <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-green-200 dark:border-green-900/30 shadow-sm">
                            <Sprout size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">Crop Shield Plus</p>
                            <p className="text-xs text-green-700 dark:text-green-400 font-medium">● Active • Policy #8821</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/policy/8821")}
                        className="text-xs font-bold text-green-700 dark:text-green-400 hover:underline"
                    >
                        View
                    </button>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            <Users size={20} className="text-slate-500" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">Health Floater</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Expired • Renew Now</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/policy/renew/health")}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Renew
                    </button>
                </div>
            </div>
        </div>
    );
};

const SchemeTicker = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-all">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Landmark className="text-amber-600" size={20} />
                Govt. Schemes For You
            </h3>
            <div className="space-y-4">
                <div className="pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">PM Fasal Bima Yojana</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Crop loss coverage due to natural calamities.</p>
                    <div className="flex gap-2 mt-2">
                        <span className="text-[10px] bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-900/30">Subsidized</span>
                    </div>
                </div>
                <div className="pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Ayushman Bharat</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Free health coverage up to ₹5 Lakhs.</p>
                </div>
            </div>
            <button
                onClick={() => navigate("/schemes")}
                className="w-full mt-4 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2 rounded-lg transition-colors"
            >
                View All Schemes →
            </button>
        </div>
    );
};


/* --- MAIN COMPONENT --- */

function DashboardHome() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        setUserProfile(profile);
    }, []);

    const getPersonalizedGreeting = () => {
        if (!userProfile?.village) return "Real Stories from Your Community";
        const riskTypes = {
            flood: "Health + Crop Insurance",
            drought: "Crop + Livestock Insurance",
            earthquake: "Home + Health Insurance"
        };
        const primaryRisk = userProfile.primaryRisk || 'flood';
        const village = userProfile.village || 'your area';
        return `People in ${village} often benefit from ${riskTypes[primaryRisk]}`;
    };

    const speak = (text, lang) => {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    const getSpeech = () => {
        if (i18n.language === "hi")
            return { text: "बीमा एक सुरक्षा कवच है।", lang: "hi-IN" };
        return { text: "Insurance is a safety net that protects you financially.", lang: "en-US" };
    };

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-10 transition-colors duration-300">
            {/* Header */}
            <header className="fixed w-full top-0 bg-cool-grey/90 dark:bg-slate-950/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="w-full px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-blue-600 flex items-center justify-center">
                            <span className="text-white text-lg">🛡️</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">InsureGuide</span>
                    </div>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Online
                    </span>
                </div>
            </header>

            <div className="pt-24 px-4 w-full">
                {/* WELCOME SECTION */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Namaste, {userProfile?.name?.split(' ')[0] || 'Farmer'}! 🙏</h1>
                    <p className="text-slate-600 dark:text-slate-400">Here is your daily insurance update.</p>
                </div>

                {/* MAIN GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN (Content & Education) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* PRIMARY CALL TO ACTION */}
                        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl group cursor-pointer" onClick={() => navigate("/agent")}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 backdrop-blur-md border border-white/10">✨ AI Powered Guide</div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Start Insurance Guide</h2>
                                    <p className="text-slate-300 max-w-md">Answer a few simple questions to find the perfect insurance plan for your family and crops.</p>
                                </div>
                                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg">
                                    <Play size={20} className="fill-slate-900" /> Start Now
                                </button>
                            </div>
                        </div>

                        {/* EDUCATION CARD */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                                    <Play className="text-blue-600 dark:text-blue-400" size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                        {t("whatIsInsurance", "What is Insurance?")}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 mb-3">
                                        Watch this short video to understand how insurance helps you protect your future.
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => {
                                                const { text, lang } = getSpeech();
                                                speak(text, lang);
                                            }}
                                            className="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-all flex items-center gap-2"
                                        >
                                            <Play size={14} className="fill-white" /> Play Video
                                        </button>
                                        <span className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium border border-slate-200 dark:border-slate-700">
                                            Hindi Subtitles
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COMMUNITY STORIES */}
                        <div>
                            <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                                <Users size={20} className="text-blue-600 dark:text-blue-400" />
                                {getPersonalizedGreeting()}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-5 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">👨‍🌾</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Ramesh Patil</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Greenfield Village</p>
                                            </div>
                                        </div>
                                        <span className="text-yellow-500 text-xs font-bold flex gap-0.5">★★★★★</span>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-900/20 mb-2">
                                        <p className="text-green-700 dark:text-green-400 font-bold text-lg">₹50,000</p>
                                        <p className="text-xs text-green-800 dark:text-green-500">Recieved for crop loss</p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-5 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">👩‍⚕️</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Savita Devi</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Riverside Village</p>
                                            </div>
                                        </div>
                                        <span className="text-yellow-500 text-xs font-bold flex gap-0.5">★★★★★</span>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-900/20 mb-2">
                                        <p className="text-green-700 dark:text-green-400 font-bold text-lg">₹3,00,000</p>
                                        <p className="text-xs text-green-800 dark:text-green-500">Health emergency cover</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SustainabilityTip context="dashboard" />
                    </div>

                    {/* RIGHT COLUMN (Utilities & Status) */}
                    <div className="lg:col-span-1">
                        <WeatherWidget />

                        <PolicyStatusCard />

                        {/* QUICK ACTIONS GRID */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => navigate("/risk-map")}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center group"
                            >
                                <div className="w-10 h-10 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                    <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">Risk Map</p>
                            </button>
                            <button
                                onClick={() => navigate("/claim")}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center group"
                            >
                                <div className="w-10 h-10 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
                                    <FileText className="text-red-600 dark:text-red-400" size={20} />
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">File Claim</p>
                            </button>
                        </div>

                        <button
                            onClick={() => navigate("/agents")}
                            className="w-full border-2 border-red-100 dark:border-red-900/20 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 py-4 rounded-xl font-bold mb-6 text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Phone className="w-4 h-4" /> Emergency Agent
                        </button>

                        <SchemeTicker />

                        {/* HELP CARD */}
                        <div className="mt-6 bg-slate-900 rounded-2xl p-5 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Need Help?</p>
                                    <p className="text-xs text-slate-300 mt-1">Our agents speak 10+ local languages.</p>
                                </div>
                            </div>
                            <button className="w-full mt-4 bg-white text-slate-900 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                                Call Support
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default DashboardHome;