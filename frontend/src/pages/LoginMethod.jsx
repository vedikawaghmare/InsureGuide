import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Fingerprint, PhoneCall, MessageSquare, WifiOff, Wifi } from "lucide-react"; // Import icons
import AuthLayout from "../components/AuthLayout";

export default function LoginMethod() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <AuthLayout>
            {/* Title Section */}
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {t("loginToContinue", "Login to Continue")}
                </h2>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("chooseLoginMethod", "Choose Login Method")}
                </h3>
                <p className="text-sm text-gray-500">
                    {t("howWouldYouLikeToLogin", "How would you like to login?")}
                </p>
            </div>

            {/* Options List */}
            <div className="space-y-4">
                {/* Biometric */}
                <button
                    onClick={() => navigate("/login/biometric")}
                    className="w-full p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-200 transition-all shadow-sm active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-full">
                            <Fingerprint className="text-green-500" size={28} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-bold text-gray-900">Biometric Login</p>
                            <p className="text-sm text-gray-500 leading-tight">
                                Fast & secure<br />fingerprint/face unlock
                            </p>
                        </div>
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">
                            Recommended
                        </span>
                    </div>
                </button>

                {/* Missed Call */}
                <button
                    onClick={() => navigate("/login/missed")}
                    className="w-full p-5 border border-gray-100 rounded-2xl bg-white hover:border-blue-200 transition-all shadow-sm active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-full">
                            <PhoneCall className="text-blue-500" size={28} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-bold text-gray-900">Missed Call OTP</p>
                            <p className="text-sm text-gray-500">No internet needed, we'll call you back</p>
                        </div>
                        <WifiOff size={18} className="text-gray-300" />
                    </div>
                </button>

                {/* SMS */}
                <button
                    onClick={() => navigate("/login/sms")}
                    className="w-full p-5 border border-gray-100 rounded-2xl bg-white hover:border-orange-200 transition-all shadow-sm active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 rounded-full">
                            <MessageSquare className="text-orange-400" size={28} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-bold text-gray-900">SMS OTP</p>
                            <p className="text-sm text-gray-500">Receive OTP via text message</p>
                        </div>
                        <Wifi size={18} className="text-gray-300" />
                    </div>
                </button>
            </div>
        </AuthLayout>
    );
}