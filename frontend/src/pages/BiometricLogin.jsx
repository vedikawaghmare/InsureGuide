import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Fingerprint, Shield, Lock, ArrowLeft, ShieldCheck, Zap, Eye, Sparkles } from "lucide-react";

function BiometricLogin() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 pointer-events-none hidden lg:block">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">

                {/* LEFT SIDE: PRIVACY & TECHNOLOGY */}
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
                                <Fingerprint className="text-slate-900 dark:text-white md:text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-white md:text-slate-900 dark:md:text-white">Biometric Access</h1>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 text-white md:text-slate-900 dark:md:text-white">
                            Your <span className="text-blue-400 underline decoration-blue-900/10 decoration-8 underline-offset-4">Unique Identity</span> Is Your Key.
                        </h2>

                        <div className="space-y-8 max-w-lg">
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <ShieldCheck className="text-emerald-400 md:text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Hardware Level Security</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Your biometric data never leaves your device's secure enclave. We only receive a secure 'Yes' or 'No' proof.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Sparkles className="text-blue-400 md:text-blue-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Zero Password Fatigue</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">No codes to remember or type. A simple glance or touch is all it takes to manage your insurance.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-slate-800 md:bg-white rounded-xl shadow-sm border border-slate-700 md:border-slate-100 h-fit">
                                    <Eye className="text-purple-400 md:text-purple-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white md:text-slate-900">Anti-Spoofing Tech</h4>
                                    <p className="text-sm text-slate-400 md:text-slate-500 leading-relaxed">Advanced liveness detection ensures that only the real you can access your sensitive financial data.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-800 md:border-slate-200 md:block hidden">
                        <div className="flex items-center justify-between text-slate-400 md:text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">FIDO2 / Biometric v3.0</span>
                            <div className="flex items-center gap-2">
                                <Lock size={12} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zero Knowledge Proof</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: BIOMETRIC SIMULATION */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-cool-grey dark:bg-slate-950 md:order-2 order-1 overflow-y-auto transition-colors duration-300">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-slate-100 dark:border-slate-800 relative z-20 transition-all">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                Authenticate
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Confirm your identity using your device's biometric sensor.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center mb-6 border-4 border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                                        <Fingerprint className="text-blue-500 animate-pulse" size={48} />
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-bold mb-1">
                                        Waiting for Sensor...
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">
                                        Place finger or look at camera
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.setItem("isAuthenticated", "true");
                                    localStorage.setItem("token", "demo-token");
                                    navigate("/home");
                                }}
                                className="w-full h-16 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-800 dark:hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-blue-900/20 flex items-center justify-center gap-3 group"
                            >
                                Simulate Verification
                                <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                            >
                                <ArrowLeft size={14} />
                                Use different method
                            </button>
                        </div>

                        <div className="mt-12 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex items-start gap-4">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Shield className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <h5 className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-1">Privacy Guarantee</h5>
                                <p className="text-[10px] font-medium text-blue-800/70 dark:text-blue-400/70 leading-relaxed italic">
                                    InsureGuide does not have access to your actual fingerprint image or face map. Authenticity is verified locally on your device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BiometricLogin;