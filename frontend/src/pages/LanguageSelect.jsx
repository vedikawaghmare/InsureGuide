import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react"; // Import the Globe icon
import AuthLayout from "../components/AuthLayout";

const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "te", label: "తెలుగు" },
    { code: "ta", label: "தமிழ்" },
    { code: "bn", label: "বাংলা" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "mr", label: "मराठी" },
];

export default function LanguageSelect() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem("selectedLanguage", code);
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {t("language.welcome", "Welcome to InsureGuide")}
                </h1>
                <p className="text-gray-600 mt-1">
                    {t("language.choose", "Choose your preferred language")}
                </p>
            </div>

            {/* Replaced 🌐 with Lucide Globe Icon */}
            <div className="flex justify-center mb-8">
                <div className="p-4 bg-gray-50 rounded-full border-2 border-gray-100 shadow-sm">
                    <Globe size={48} className="text-gray-800" strokeWidth={1.5} />
                </div>
            </div>

            {/* Language grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {languages.map((lang) => {
                    const active = i18n.language === lang.code;
                    return (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.code)}
                            className={`py-3 rounded-xl border-2 font-medium transition-all active:scale-95
                                ${active
                                    ? "border-zinc-900 bg-zinc-50 text-zinc-900 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            {lang.label}
                        </button>
                    );
                })}
            </div>

            {/* Continue */}
            <button
                onClick={() => navigate("/login")}
                className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-bold text-lg hover:bg-black transition-all shadow-lg active:scale-[0.98]"
            >
                Continue →
            </button>

        </AuthLayout>
    );
}