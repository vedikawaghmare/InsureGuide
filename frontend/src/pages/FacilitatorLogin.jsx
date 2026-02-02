import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, Eye, EyeOff, Shield, ShieldCheck, Heart, MapPin, Activity } from 'lucide-react';

function FacilitatorLogin() {
    const [credentials, setCredentials] = useState({
        facilitatorId: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Super simple - just check if both fields have any value
        if (credentials.facilitatorId.trim() && credentials.password.trim()) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("token", "facilitator-token");
            localStorage.setItem("role", "facilitator");
            navigate('/facilitator');
        } else {
            alert('Please enter both ID and password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 pointer-events-none hidden lg:block">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative z-10 w-full overflow-y-auto lg:overflow-hidden">

                {/* LEFT SIDE: IMPACT & INFO */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-12 lg:mb-16">
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group font-bold"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Welcome
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-lg">
                                <Users className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Facilitator Portal</h1>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
                            Empowering <span className="text-blue-600 dark:text-blue-400 underline decoration-blue-100 dark:decoration-blue-900/20 decoration-8 underline-offset-4">Rural Resilience</span> Through Community.
                        </h2>

                        <div className="space-y-8 max-w-lg">
                            <div className="flex gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 h-fit">
                                    <ShieldCheck className="text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Guardian of Trust</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">As a village helper, you are the bridge between insurance security and the families in your community.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 h-fit">
                                    <Heart className="text-rose-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Direct Impact</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Help families secure their crops, health, and futures by maintaining accurate digital records.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 h-fit">
                                    <Activity className="text-blue-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Data Integrity</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Your portal provides real-time access to risk maps, policy tracking, and community statistics.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Helpers</span>
                                <span className="text-2xl font-black text-slate-900 uppercase">1,240+</span>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Village Coverage</span>
                                <span className="text-2xl font-black text-slate-900 uppercase">86 Districts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: PROFESSIONAL LOGIN FORM */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex items-center justify-center bg-slate-900 lg:bg-transparent relative transition-colors">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl p-10 border border-slate-100 dark:border-slate-800 relative z-20 transition-all">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Secure Access</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Verify your identity to enter the dashboard.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facilitator Identifier</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        value={credentials.facilitatorId}
                                        onChange={(e) => setCredentials({ ...credentials, facilitatorId: e.target.value })}
                                        placeholder="VILL-FAC-001"
                                        className="w-full h-14 pl-12 pr-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-slate-900 dark:text-white focus:bg-white focus:border-slate-900 dark:focus:border-blue-500 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Passkey</label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full h-14 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-slate-900 dark:text-white focus:bg-white focus:border-slate-900 dark:focus:border-blue-500 transition-all outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-800 dark:hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-blue-900/20 mt-4 flex items-center justify-center gap-3"
                            >
                                {loading ? 'Validating...' : 'Enter Dashboard'}
                            </button>
                        </form>

                        {/* DEMO NOTICE */}
                        <div className="mt-10 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex items-start gap-4">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <ShieldCheck className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-tight mb-1">Development Mode</p>
                                <p className="text-[11px] font-medium text-blue-700 dark:text-blue-400 leading-relaxed italic">
                                    Authentication is bypassed for testing. Any ID/Password combination will grant administrative access.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">InsureGuide Internal System</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacilitatorLogin;