import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, PhoneCall, Gift, Heart, Menu, X, Users, Globe, ShieldCheck, Zap, Wheat, Home, Star, ArrowUpRight, Activity, Map, FileText, Phone, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 transition-colors duration-300 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* HEADER */}
            <header className="fixed w-full top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-[100] border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-lg">
                            <Shield className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">InsureGuide</span>
                    </div>

                    {/* Desktop Utility Nav */}
                    <div className="hidden lg:flex items-center gap-6">
                        <ThemeToggle />
                        <button
                            onClick={() => navigate("/start")}
                            className="px-6 py-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* Split Hero Section */}
            <section className="pt-40 pb-20 px-6 overflow-hidden">
                <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-3/5 text-center lg:text-left relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-black text-xs mb-8 border border-blue-100 uppercase tracking-widest">
                            <Sparkles size={14} /> Digital India Certified
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tighter">
                            Insurance <br />
                            <span className="text-blue-600 dark:text-blue-400">Simplified</span> For <br />
                            <span className="italic font-serif serif-font">Rural Homes</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed lg:mx-0 mx-auto font-medium">
                            Protecting dreams across Bharat with voice-guided insurance, instant claims, and risk mapping.
                            Built for everyone, working everywhere.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 lg:justify-start justify-center">
                            <button
                                onClick={() => navigate('/start')}
                                className="px-10 py-5 rounded-[24px] bg-slate-900 dark:bg-blue-600 text-white font-black text-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-blue-900/20 hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] active:scale-95 flex items-center justify-center gap-3 group"
                            >
                                Start Your Journey <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex -space-x-3 items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 dark:opacity-40">
                                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center font-black text-slate-400">G</div>
                                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-700 overflow-hidden flex items-center justify-center font-black text-slate-500">M</div>
                                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-400 dark:bg-slate-600 overflow-hidden flex items-center justify-center font-black text-slate-600">J</div>
                                <span className="ml-6 text-sm font-bold text-slate-400 dark:text-slate-500">Trusted by 50k+ Families</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5 relative">
                        <div className="relative z-10 bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-700">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck size={32} />
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Coverage</span>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">₹4.2 Cr+</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                        <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Claims</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-3/4"></div>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">92% Faster Processing</p>
                                </div>
                                <div className="flex items-center gap-4 p-4 border-2 border-slate-50 dark:border-slate-800/50 rounded-2xl">
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white">Missed Call Login</h4>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Working without internet in 12 states</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-24 bg-slate-900 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div>
                            <p className="text-5xl md:text-7xl font-black text-white mb-2 font-mono">1.2k+</p>
                            <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">Villages Connected</p>
                        </div>
                        <div>
                            <p className="text-5xl md:text-7xl font-black text-white mb-2 font-mono">₹85M</p>
                            <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em]">Claims Paid</p>
                        </div>
                        <div>
                            <p className="text-5xl md:text-7xl font-black text-white mb-2 font-mono">15</p>
                            <p className="text-xs font-black text-orange-400 uppercase tracking-[0.3em]">Dialects Supported</p>
                        </div>
                        <div>
                            <p className="text-5xl md:text-7xl font-black text-white mb-2 font-mono">24/7</p>
                            <p className="text-xs font-black text-purple-400 uppercase tracking-[0.3em]">Safety Monitoring</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Features Grid */}
            <section id="features" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="mb-24">
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-4 block">Core Solutions</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white max-w-2xl leading-tight">Everything You Need To Secure Your Future.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<FileText size={32} />}
                            title="Zero-Paper Claims"
                            desc="File insurance claims using just your voice and phone camera. No complicated forms or physical visits required."
                            color="text-blue-600 dark:text-blue-400"
                            bgColor="bg-blue-50 dark:bg-blue-900/10"
                        />
                        <FeatureCard
                            icon={<Map size={32} />}
                            title="Community Risk Map"
                            desc="Advanced satellite data showing real-time flood, drought, and crop health risks for your specific plot."
                            color="text-emerald-600 dark:text-emerald-400"
                            bgColor="bg-emerald-50 dark:bg-emerald-900/10"
                        />
                        <FeatureCard
                            icon={<Phone size={32} />}
                            title="Offline Protocol"
                            desc="Access your policy, check status, and receive urgent alerts even in zero-internet areas via our SMS gateway."
                            color="text-orange-600 dark:text-orange-400"
                            bgColor="bg-orange-50 dark:bg-orange-900/10"
                        />
                        <FeatureCard
                            icon={<Activity size={32} />}
                            title="AI Saathi"
                            desc="Our multilingual AI agent understands local accents and guiding you through every step of the insurance process."
                            color="text-purple-600 dark:text-purple-400"
                            bgColor="bg-purple-50 dark:bg-purple-900/10"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-32 pb-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-lg shadow-slate-200 dark:shadow-blue-900/20">
                                    <Shield className="text-white" size={24} />
                                </div>
                                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">InsureGuide</span>
                            </div>
                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-widest">Emboldening Rural India through technology and trust.</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8">Solutions</h5>
                            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Crop Insurance</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Livestock Protection</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Life & Health</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Equipment Cover</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8">Resources</h5>
                            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Knowledge Base</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Village Helper Portal</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Safety Guides</li>
                                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Risk Trends</li>
                            </ul>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800">
                            <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-6">Connect Locally</h5>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-6">Need immediate help? Call our toll-free support line.</p>
                            <a href="tel:1800-INS-UR" className="text-2xl font-black text-slate-900 dark:text-white block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">1800-123-4567</a>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-50 dark:border-slate-800 gap-8">
                        <div className="flex gap-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Regulator info</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">© 2024 InsureGuide. Part of Digital India Mission.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc, color, bgColor }) => (
    <div className="p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-500 group">
        <div className={`w-16 h-16 rounded-2xl ${bgColor} dark:bg-slate-800 ${color} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
            {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{title}</h3>
        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-wide">{desc}</p>
    </div>
);
