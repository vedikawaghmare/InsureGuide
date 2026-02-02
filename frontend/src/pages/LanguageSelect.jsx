import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Lock, Shield, Wheat, Home, Globe, Users, Heart, CheckCircle, Languages, MapPin } from "lucide-react";
import GoogleTranslate from "../components/GoogleTranslate";
import { useEffect } from "react";

const languages = [
    { code: "en", label: "English", googleCode: "en" },
    { code: "hi", label: "हिंदी", googleCode: "hi" },
    { code: "te", label: "తెలుగు", googleCode: "te" },
    { code: "ta", label: "தமிழ்", googleCode: "ta" },
    { code: "bn", label: "বাংলা", googleCode: "bn" },
    { code: "gu", label: "ગુજરાતી", googleCode: "gu" },
    { code: "kn", label: "ಕನ್ನಡ", googleCode: "kn" },
    { code: "mr", label: "मराठी", googleCode: "mr" },
];

export default function LanguageSelect() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem("selectedLanguage", code);

        // Set Google Translate cookie for persistence
        document.cookie = `googtrans=/en/${code}; path=/;`;

        // Trigger Google Translate widget
        setTimeout(() => {
            const googleTranslateCombo = document.querySelector('.goog-te-combo');
            if (googleTranslateCombo) {
                googleTranslateCombo.value = code;
                googleTranslateCombo.dispatchEvent(new Event('change'));
                console.log(`Google Translate set to: ${code}`);
            } else {
                // Force page reload with Google Translate cookie
                window.location.reload();
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 pointer-events-none hidden lg:block">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">

                {/* LEFT SIDE: CONTEXT & FEATURES */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between md:order-1 order-2 bg-slate-900 md:bg-transparent text-white md:text-slate-900">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 md:bg-slate-900 dark:md:bg-blue-600 flex items-center justify-center shadow-lg">
                                <Languages className="text-slate-900 dark:text-white md:text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-white md:text-slate-900 dark:md:text-white">Language Selection</h1>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 text-white md:text-slate-900 dark:md:text-white">
                            Insurance In <span className="text-blue-400 underline decoration-blue-900/10 decoration-8 underline-offset-4">Your Language</span>, Your Way.
                        </h2>

                        <div className="space-y-8 max-w-lg">
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Globe className="text-blue-400 md:text-blue-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900 dark:md:text-white">8 Regional Languages</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 dark:md:text-slate-400 leading-relaxed">Complete app translation in Hindi, Telugu, Tamil, Bengali, Gujarati, Kannada, and Marathi.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Users className="text-green-400 md:text-green-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Rural Community Focus</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Designed specifically for farmers and rural families across India's diverse linguistic regions.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Heart className="text-red-400 md:text-red-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Cultural Understanding</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Insurance terms and concepts explained in familiar language that respects local customs.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-800 md:border-slate-200 md:block hidden">
                        <div className="flex items-center justify-between text-slate-400 md:text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">InsureGuide Multilingual v3.1</span>
                            <div className="flex items-center gap-2">
                                <MapPin size={12} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Serving Rural India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: LANGUAGE SELECTION */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-cool-grey dark:bg-slate-950 md:order-2 order-1 overflow-y-auto transition-colors duration-300">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-slate-100 dark:border-slate-800 relative z-20 transition-all">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-lg">
                                    <Shield className="text-white" size={20} />
                                </div>
                                <span className="text-xl font-black text-slate-900 dark:text-white">InsureGuide</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-6">Insurance made simple for rural India</p>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                Choose Your Language
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Select your preferred language. The entire app will switch to it.
                            </p>
                        </div>

                        {/* Language Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {languages.map((lang) => {
                                const active = i18n.language === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => selectLanguage(lang.code)}
                                        className={`py-4 px-4 rounded-2xl border-2 font-bold transition-all text-sm relative
                                            ${active
                                                ? "border-slate-900 dark:border-blue-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                                                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400"
                                            }`}
                                    >
                                        {active && (
                                            <CheckCircle className="absolute top-2 right-2 text-green-500" size={16} />
                                        )}
                                        {lang.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-black text-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-lg mb-6"
                        >
                            Continue →
                        </button>

                        {/* Trust Signal */}
                        <div className="text-center">
                            <p className="text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
                                <Lock size={14} className="text-green-600" />
                                Your choice is saved. You can change it anytime in settings.
                            </p>
                        </div>

                        {/* Hidden Google Translate Widget */}
                        <div className="hidden">
                            <GoogleTranslate />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}