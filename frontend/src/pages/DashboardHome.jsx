import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Card from "../components/Card";

function DashboardHome() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const [userProfile, setUserProfile] = useState(null);

    // Get user profile data
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        setUserProfile(profile);
    }, []);

    // Generate personalized greeting
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

    // 🔊 Text to speech
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
            return {
                text: "बीमा एक सुरक्षा कवच है।",
                lang: "hi-IN",
            };

        return {
            text: "Insurance is a safety net that protects you financially.",
            lang: "en-US",
        };
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            {/* HEADER */}
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-lg font-semibold">🛡️ InsureGuide</h1>
                    <span className="text-sm text-green-600">● Online</span>
                </div>

                {/* EDUCATION CARD */}
                <Card className="mb-6">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl"></div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                                {t("whatIsInsurance", "What is Insurance?")}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Watch this short video to understand how insurance helps you
                            </p>

                            <div className="flex gap-2 mt-3 flex-wrap">
                                <button
                                    onClick={() => {
                                        const { text, lang } = getSpeech();
                                        speak(text, lang);
                                    }}
                                    aria-label="Play insurance explanation audio"
                                    className="px-4 py-3 rounded-lg border text-sm min-h-[44px]"
                                >
                                    ▶️ Auto-play (30 sec)
                                </button>

                                <span className="inline-flex items-center px-3 py-1 rounded-full border text-xs align-middle">
                                    Hindi Subtitles
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* PERSONALIZED COMMUNITY STORIES */}
                <h2 className="font-semibold mb-3">
                    {getPersonalizedGreeting()}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Card variant="green">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">Ramesh Patil</h4>
                                <p className="text-xs text-gray-600">Greenfield Village</p>
                            </div>
                            <span className="text-yellow-500">★★★★★</span>
                        </div>

                        <p className="mt-3 text-green-700 font-semibold">
                            ₹50,000
                        </p>
                        <p className="text-sm text-gray-600">
                            Successfully claimed for crop loss
                        </p>
                    </Card>

                    <Card variant="green">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">Savita Devi</h4>
                                <p className="text-xs text-gray-600">Riverside Village</p>
                            </div>
                            <span className="text-yellow-500">★★★★★</span>
                        </div>

                        <p className="mt-3 text-green-700 font-semibold">
                            ₹3,00,000
                        </p>
                        <p className="text-sm text-gray-600">
                            Successfully claimed for health emergency
                        </p>
                    </Card>
                </div>

                {/* HELP CARD */}
                <Card variant="blue" className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl">📞</div>
                        <div>
                            <p className="font-semibold">
                                Can’t Read? We’re Here to Help!
                            </p>
                            <p className="text-sm text-gray-600">
                                Get voice guidance in your language
                            </p>
                        </div>
                    </div>

                    <button 
                        aria-label="Call insurance helpline for voice assistance"
                        className="bg-black text-white px-6 py-4 rounded-xl text-sm min-h-[48px] min-w-[160px]"
                    >
                        Call: 1800-XXX-XXXX
                    </button>
                </Card>

                {/* MAIN ACTIONS */}
                <h2 className="font-semibold text-center mb-4">
                    What would you like to do?
                </h2>

                <button
                    onClick={() => navigate("/agent")}
                    aria-label="Start interactive insurance guide"
                    className="w-full bg-black text-white py-6 rounded-2xl font-semibold mb-3 text-lg min-h-[64px]"
                >
                    ▶ Start Insurance Guide
                </button>

                <button
                    onClick={() => navigate("/agents")}
                    aria-label="Talk to insurance agent for emergency help"
                    className="w-full border-2 border-black py-6 rounded-2xl font-semibold mb-6 text-lg min-h-[64px]"
                >
                    📞 Talk to Agent Now (Emergency)
                </button>

                {/* SECONDARY ACTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Card
                        className="text-center cursor-pointer hover:shadow-md transition p-6 min-h-[80px] flex items-center justify-center"
                        onClick={() => navigate("/risk-map")}
                        role="button"
                        tabIndex={0}
                        aria-label="View village risk map"
                        onKeyDown={(e) => e.key === 'Enter' && navigate("/risk-map")}
                    >
                        🗺️ Village Risk Map
                    </Card>

                    <Card
                        className="text-center cursor-pointer hover:shadow-md transition p-6 min-h-[80px] flex items-center justify-center"
                        onClick={() => navigate("/claim")}
                        role="button"
                        tabIndex={0}
                        aria-label="File insurance claim"
                        onKeyDown={(e) => e.key === 'Enter' && navigate("/claim")}
                    >
                        📄 File a Claim
                    </Card>
                </div>

                {/* TRUST SECTION */}
                <Card variant="gray">
                    <h3 className="font-semibold text-center mb-4">
                        Why Trust InsureGuide?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-green-600 text-xl">✔</p>
                            <p className="font-semibold">1,247+ Users</p>
                            <p className="text-sm text-gray-600">In your region</p>
                        </div>

                        <div className="text-center">
                            <p className="text-blue-600 text-xl">🛡️</p>
                            <p className="font-semibold">Verified Agents</p>
                            <p className="text-sm text-gray-600">
                                Government approved
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-orange-500 text-xl">📡</p>
                            <p className="font-semibold">Works Offline</p>
                            <p className="text-sm text-gray-600">7-day access</p>
                        </div>
                    </div>
                </Card>

                {/* FOOTER */}
                <div className="flex justify-center gap-6 text-sm text-gray-500 mt-8">
                    <span>FAQ</span>
                    <span>Help</span>
                    <span>Facilitator Login</span>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
