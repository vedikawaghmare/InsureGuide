import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { PhoneCall } from "lucide-react";

function MissedCallLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📞 Request Missed Call OTP
  const handleMissedCall = async () => {
    try {
      if (!phone || phone.length !== 10) {
        alert("Enter valid 10-digit mobile number");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/missed-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      console.log("Missed Call API Response:", data);

      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Request failed");
        return;
      }

      // ✅ move to OTP step
      setOtpSent(true);

      // demo only
      console.log("OTP (demo): " + data.demoOtp);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    try {
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

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", data.token || "missed-call-token");
      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Missed Call Login
        </h2>

        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
          <PhoneCall className="text-blue-500" size={36} />
        </div>

        {/* Phone Input */}
        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Enter 10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={otpSent}
        />

        {/* OTP Input */}
        {otpSent && (
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {/* Button */}
        <button
          onClick={otpSent ? verifyOtp : handleMissedCall}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : otpSent
            ? "Verify OTP"
            : "I’ve Given Missed Call"}
        </button>

      </div>
    </AuthLayout>
  );
}

export default MissedCallLogin;
