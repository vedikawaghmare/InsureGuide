import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageSquare, ArrowLeft, Shield, Lock, ShieldCheck, Zap, Smartphone, MessageCircle } from "lucide-react";

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

        try {
            const res = await fetch("http://localhost:5000/api/auth/sms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) setOtpSent(true);
            else alert(data.message);
        } catch (error) {
            setLoading(false);
            alert("Connection error. Is the server running?");
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            alert("Enter valid 6-digit OTP");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/home");
            } else alert(data.message);
        } catch (error) {
            alert("Verification failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 pointer-events-none hidden lg:block">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">

                {/* LEFT SIDE: CONTEXT & SECURITY */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between md:order-1 order-2 bg-slate-900 md:bg-transparent text-white md:text-slate-900">
                    <div>
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center gap-2 text-slate-400 hover:text-white md:text-slate-500 md:hover:text-slate-900 mb-12 transition-all group font-bold"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Methods
                        </button>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 md:bg-slate-900 dark:md:bg-blue-600 flex items-center justify-center shadow-lg">
                                <MessageSquare className="text-slate-900 dark:text-white md:text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-white md:text-slate-900 dark:md:text-white">SMS Verification</h1>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 text-white md:text-slate-900 dark:md:text-white">
                            Secure <span className="text-orange-400 underline decoration-orange-900/10 decoration-8 underline-offset-4">One-Time Access</span> For Your Wallet.
                        </h2>

                        <div className="space-y-8 max-w-lg">
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <ShieldCheck className="text-emerald-400 md:text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Encrypted Codes</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Every OTP is uniquely generated and encrypted for your specific login session.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Zap className="text-orange-400 md:text-orange-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Lightspeed Delivery</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Powered by high-priority SMS gateways to ensure codes reach you even in low signal areas.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Smartphone className="text-blue-400 md:text-blue-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Account Recovery</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Verified phone numbers act as your primary recovery key if you lose access to other methods.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-800 md:border-slate-200 md:block hidden">
                        <div className="flex items-center justify-between text-slate-400 md:text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">InsureGuide SMS Gateway v2.4</span>
                            <div className="flex items-center gap-2">
                                <Lock size={12} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Privacy Shield Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: PROFESSIONAL LOGIN FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-cool-grey dark:bg-slate-950 md:order-2 order-1 overflow-y-auto transition-colors duration-300">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-slate-100 dark:border-slate-800 relative z-20 transition-all">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                {otpSent ? "Verify Code" : "Phone Login"}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                {otpSent ? "Enter the 6-digit code sent to your phone." : "Enter your mobile number to receive a secure code."}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Smartphone className={`absolute left-4 top-1/2 -translate-y-1/2 ${otpSent ? 'text-slate-300' : 'text-slate-400'}`} size={20} />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="9876543210"
                                        disabled={otpSent}
                                        className="w-full h-14 pl-12 pr-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-slate-900 dark:text-white focus:bg-white focus:border-slate-900 dark:focus:border-blue-500 transition-all outline-none disabled:opacity-50"
                                    />
                                    {otpSent && (
                                        <button
                                            onClick={() => { setOtpSent(false); setOtp(""); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-800"
                                        >
                                            Change
                                        </button>
                                    )}
                                </div>
                            </div>

                            {otpSent && (
                                <div className="space-y-2 animate-in zoom-in-95 duration-300">
                                    <label className="text-[10px] font-black text-orange-400 uppercase tracking-widest ml-1">6-Digit OTP Code</label>
                                    <div className="relative">
                                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={20} />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="······"
                                            maxLength={6}
                                            className="w-full h-14 pl-12 pr-5 bg-orange-50/30 dark:bg-orange-950/20 border-2 border-orange-100 dark:border-orange-900/30 rounded-2xl font-black text-2xl tracking-[0.5em] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 transition-all outline-none"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold text-right pt-1">Resend code in 45s</p>
                                </div>
                            )}

                            <button
                                onClick={otpSent ? verifyOtp : sendSmsOtp}
                                disabled={loading}
                                className={`w-full h-14 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all mt-4 flex items-center justify-center gap-3 ${otpSent
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200'
                                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'
                                    }`}
                            >
                                {loading ? 'Processing...' : otpSent ? 'Verify & Continue' : 'Send Secure Code'}
                                {!loading && (otpSent ? <ShieldCheck size={20} /> : <Zap size={20} />)}
                            </button>

                            <div className="pt-6 border-t border-slate-50 mt-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                                >
                                    <ArrowLeft size={14} />
                                    Try different method
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Lock className="text-slate-500 dark:text-slate-400" size={20} />
                            </div>
                            <div>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                                    Your privacy is our priority. We never share your mobile number or browsing activity with third parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SmsOtpLogin;
