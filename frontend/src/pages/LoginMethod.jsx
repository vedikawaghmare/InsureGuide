import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Fingerprint, PhoneCall, MessageSquare, WifiOff, Wifi, Volume2, ChevronDown, ChevronUp, Shield, Lock, ShieldCheck, Zap, Laptop } from "lucide-react";
import { useState } from "react";

export default function LoginMethod() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    // Text to speech for voice hint with Indian language support
    const playVoiceHint = () => {
        if ('speechSynthesis' in window) {
            const currentLang = document.documentElement.lang || localStorage.getItem('selectedLanguage') || 'en';
            const voiceHints = {
                'en': "We will give you a missed call. Just answer.",
                'hi': "हम आपको मिस्ड कॉल देंगे। बस फोन उठाएं।",
                'mr': "आम्ही तुम्हाला मिस्ड कॉल देऊ। फक्त फोन उचला।",
                'gu': "અમે તમને મિસ્ડ કૉલ આપીશું. ફક્ત ફોન ઉઠાવો.",
                'ta': "நாங்கள் உங்களுக்கு மிஸ்டு கால் கொடுப்போம். போனை எடுங்கள்.",
                'te': "మేము మీకు మిస్డ్ కాల్ ఇస్తాము. ఫోన్ ఎత్తండి.",
                'bn': "আমরা আপনাকে মিসড কল দেব। শুধু ফোন তুলুন।",
                'kn': "ನಾವು ನಿಮಗೇ ಮಿಸ್ಡ್ ಕಾಲ್ ಕೊಡುತ್ತೇವೇ. ಫೋನ್ ಎತ್ತಿ."
            };

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

            const textToSpeak = voiceHints[currentLang] || voiceHints['en'];
            const voiceSetting = voiceSettings[currentLang] || voiceSettings['en'];

            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = voiceSetting.lang;
            utterance.rate = voiceSetting.rate;

            const voices = window.speechSynthesis.getVoices();
            const indianVoice = voices.find(voice =>
                voice.lang.includes(voiceSetting.lang) ||
                voice.name.toLowerCase().includes('indian') ||
                voice.name.toLowerCase().includes('india')
            );

            if (indianVoice) utterance.voice = indianVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 pointer-events-none hidden lg:block">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">

                {/* LEFT SIDE: WELCOME & IMPACT */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between md:order-1 order-2 bg-slate-900 md:bg-transparent text-white md:text-slate-900">
                    <div className="md:block hidden">
                        <div className="flex items-center gap-3 mb-10 text-white md:text-slate-900 dark:md:text-white transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 md:bg-slate-900 dark:md:bg-blue-600 flex items-center justify-center shadow-lg">
                                <Shield className="text-slate-900 dark:text-white md:text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight">InsureGuide</h1>
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8 text-white md:text-slate-900 dark:md:text-white">
                            Safe Insurance <span className="text-blue-400 underline decoration-blue-900/30 decoration-8 underline-offset-4">For Every Village</span> Home.
                        </h2>

                        <div className="space-y-8 mt-12">
                            <div className="flex gap-5">
                                <div className="p-4 bg-slate-800 rounded-2xl shadow-sm h-fit">
                                    <ShieldCheck className="text-emerald-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Govt. Trusted</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Direct connection to government insurance schemes and approved facilitators.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="p-4 bg-slate-800 rounded-2xl shadow-sm h-fit">
                                    <WifiOff className="text-orange-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">No Internet? No Problem.</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Our primary login and claim tracking work even without data connections.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="p-4 bg-slate-800 rounded-2xl shadow-sm h-fit">
                                    <Zap className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Instant Guidance</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Voice support in your language at every step of your insurance journey.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-800 lg:border-slate-200 md:block hidden">
                        <div className="flex items-center gap-8 text-white/60">
                            <div className="flex items-center gap-2">
                                <Lock size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">End-to-End Encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">Digital India Certified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: LOGIN OPTIONS */}
                <div className="w-full md:w-1/2 p-4 md:p-12 lg:p-16 flex items-center justify-center bg-cool-grey dark:bg-slate-950 md:order-2 order-1 overflow-y-auto transition-colors duration-300">
                    <div className="w-full max-w-lg space-y-8">
                        {/* MOBILE LOGO */}
                        <div className="md:hidden flex items-center justify-center gap-2 mb-8">
                            <Shield className="text-slate-900 dark:text-blue-500" size={32} />
                            <span className="text-2xl font-black text-slate-900 dark:text-white">InsureGuide</span>
                        </div>

                        <div className="text-center md:text-left mb-10">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Get Started</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Choose your preferred login method to continue.</p>
                        </div>

                        {/* PRIMARY METHOD: MISSED CALL */}
                        <div className="group">
                            <button
                                onClick={() => navigate("/login/missed")}
                                className="w-full p-8 border-4 border-emerald-100 dark:border-emerald-900/20 rounded-[32px] bg-white dark:bg-slate-900 hover:border-emerald-500 transition-all shadow-xl shadow-slate-200/50 dark:shadow-emerald-900/10 active:scale-[0.98] relative overflow-hidden text-left"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                    <PhoneCall size={64} className="text-emerald-900 dark:text-emerald-400" />
                                </div>
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="p-5 bg-emerald-500 rounded-2xl shadow-lg group-hover:rotate-6 transition-transform">
                                        <PhoneCall className="text-white" size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] block mb-1">Easiest Method</span>
                                        <p className="font-black text-2xl text-slate-900 dark:text-white">Missed Call</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Zero internet required. Just tap and wait.</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <Volume2 size={18} className="text-emerald-600" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); playVoiceHint(); }}
                                            className="text-sm font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
                                        >
                                            Listen to guide
                                        </button>
                                    </div>
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                                        <WifiOff size={10} /> No Internet
                                    </span>
                                </div>
                            </button>
                        </div>

                        {/* MORE OPTIONS TOGGLE */}
                        <div className="pt-4">
                            <button
                                onClick={() => setShowMoreOptions(!showMoreOptions)}
                                className="w-full p-6 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between group font-bold bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
                            >
                                <span className="tracking-tight text-lg">Other secure login methods</span>
                                {showMoreOptions ? <ChevronUp className="group-hover:-translate-y-1 transition-transform" /> : <ChevronDown className="group-hover:translate-y-1 transition-transform" />}
                            </button>
                        </div>

                        {/* ADDITIONAL OPTIONS */}
                        {showMoreOptions && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                {/* Biometric */}
                                <button
                                    onClick={() => navigate("/login/biometric")}
                                    className="p-6 border-2 border-slate-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-sm active:scale-[0.98] text-left"
                                >
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl w-fit mb-4">
                                        <Fingerprint className="text-blue-600 dark:text-blue-400" size={24} />
                                    </div>
                                    <p className="font-black text-slate-900 dark:text-white">Biometric</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-widest">Face / Finger</p>
                                </button>

                                {/* SMS */}
                                <button
                                    onClick={() => navigate("/login/sms")}
                                    className="p-6 border-2 border-slate-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 hover:border-orange-400 dark:hover:border-orange-500 transition-all shadow-sm active:scale-[0.98] text-left"
                                >
                                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl w-fit mb-4">
                                        <MessageSquare className="text-orange-500 dark:text-orange-400" size={24} />
                                    </div>
                                    <p className="font-black text-slate-900 dark:text-white">SMS OTP</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-widest">Text Message</p>
                                </button>
                            </div>
                        )}

                        {/* FOOTER AREA */}
                        <div className="pt-12 mt-8 text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                                <Lock size={14} className="text-emerald-600" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Privacy Protected System</span>
                            </div>

                            <div className="border-t border-slate-200 pt-8">
                                <button
                                    onClick={() => navigate("/login/facilitator")}
                                    className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em] font-mono"
                                >
                                    Are you a village helper? Login here
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}