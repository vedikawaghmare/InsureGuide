import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SmsOtpLogin() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendSmsOtp = async () => {
        if (phone.length !== 10) {
            alert("Enter valid 10-digit number");
            return;
        }

        setLoading(true);

        const res = await fetch("http://localhost:5000/api/auth/sms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
        });

        const data = await res.json();
        console.log(data);
        setLoading(false);

        if (res.ok) setOtpSent(true);
        else alert(data.message);
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            alert("Enter valid 6-digit OTP");
            return;
        }

        const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, otp }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        } else alert(data.message);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-xl md:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {t("login.sms.title", "SMS OTP Login")}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {t("login.sms.subtitle", "Receive OTP via text message")}
                    </p>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <input
                        type="tel"
                        placeholder={t("login.sms.placeholder", "Enter 10-digit mobile number")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {otpSent && (
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    )}

                    <button
                        onClick={otpSent ? verifyOtp : sendSmsOtp}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-900 transition disabled:opacity-60"

                    >
                        {loading
                            ? "Please wait..."
                            : otpSent
                                ? "Verify OTP"
                                : t("login.sms.button", "Send OTP")}
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="w-full text-sm text-green-700 hover:underline mt-2"
                    >
                        Use different login method
                    </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    {t("login.terms", "By continuing, you agree to our Terms & Conditions")}
                </p>
            </div>
        </div>
    );
}

export default SmsOtpLogin;
