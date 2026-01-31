import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../components/Card";

function DashboardHome() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

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
                                    className="px-4 py-2 rounded-lg border text-sm"
                                >
                                    ▶️ Auto-play (30 sec)
                                </button>

                                <span class="inline-flex items-center px-3 py-1 rounded-full border text-xs align-middle">
                                    Hindi Subtitles
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* COMMUNITY STORIES */}
                <h2 className="font-semibold mb-3">
                    Real Stories from Your Community
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

                    <button className="bg-black text-white px-5 py-3 rounded-xl text-sm">
                        Call: 1800-XXX-XXXX
                    </button>
                </Card>

                {/* MAIN ACTIONS */}
                <h2 className="font-semibold text-center mb-4">
                    What would you like to do?
                </h2>

                <button
                    onClick={() => navigate("/agent")}
                    className="w-full bg-black text-white py-4 rounded-2xl font-semibold mb-3"
                >
                    ▶ Start Insurance Guide
                </button>

                <button
                    onClick={() => navigate("/agents")}
                    className="w-full border-2 border-black py-4 rounded-2xl font-semibold mb-6"
                >
                    📞 Talk to Agent Now (Emergency)
                </button>

                {/* SECONDARY ACTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Card
                        className="text-center cursor-pointer hover:shadow-md transition"
                        onClick={() => navigate("/risk-map")}
                    >
                        🗺️ Village Risk Map
                    </Card>

                    <Card
                        className="text-center cursor-pointer hover:shadow-md transition"
                        onClick={() => navigate("/claim")}
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
