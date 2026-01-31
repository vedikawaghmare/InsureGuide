import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthLayout from "../components/AuthLayout";
import { Fingerprint, PhoneCall, MessageSquare, WifiOff, Wifi } from "lucide-react"; // Import icons

function BiometricLogin() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <AuthLayout>
            <div className="text-center space-y-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    {t("login.biometric.title", "Biometric Login")}
                </h2>


                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    
                        <div className="p-3 bg-green-50 rounded-full">
                            <Fingerprint className="text-green-500" size={28} />
                        </div>
                   
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {t("login.biometric.auth", "Biometric Authentication")}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {t("login.biometric.instruction", "Place your finger or look at the camera")}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg py-4 text-sm text-gray-600">
                    Waiting for biometric verification…
                </div>

                <button
                    onClick={() => {
                        localStorage.setItem("isAuthenticated", "true");
                        localStorage.setItem("token", "demo-token");
                        navigate("/home");
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-900 transition disabled:opacity-60"
                >
                    Simulate Biometric Login
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Use different method
                </button>

            </div>
        </AuthLayout>
    );
}

export default BiometricLogin;
