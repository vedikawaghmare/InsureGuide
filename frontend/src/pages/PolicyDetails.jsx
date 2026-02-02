import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Shield,
    CheckCircle,
    AlertTriangle,
    Calendar,
    Download,
    CreditCard,
    ArrowRight,
    FileText,
    Activity,
    Clock
} from "lucide-react";

const POLICIES = {
    "8821": {
        id: "8821",
        name: "Crop Shield Plus",
        status: "Active",
        holder: "Demo User",
        startDate: "Oct 12, 2025",
        expiryDate: "Oct 11, 2026",
        sumInsured: "₹2,50,000",
        premiumPaid: "₹4,200",
        coverage: [
            "Flood damage to Wheat & Rice",
            "Drought protection (Deficit Rainfall)",
            "Pest infestation coverage",
            "Post-harvest loss (up to 14 days)"
        ],
        documents: ["Policy_Bond_8821.pdf", "Premium_Receipt.pdf"]
    },
    "health": {
        id: "H-4421",
        name: "Health Floater Plan",
        status: "Expired",
        holder: "Demo User + 3 Family Members",
        startDate: "Jan 01, 2025",
        expiryDate: "Dec 31, 2025",
        sumInsured: "₹5,00,000",
        lastPremium: "₹7,500",
        coverage: [
            "Cashless hospitalization",
            "Pre & Post medical expenses",
            "Maternity cover",
            "Emergency ambulance"
        ],
        documents: ["Health_Card.pdf", "Renewal_Notice.pdf"]
    }
};

export default function PolicyDetails() {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const policy = id ? POLICIES[id] : POLICIES[type];
    const isRenewal = !!type;

    if (!policy) return <div className="p-10 text-center font-bold">Policy not found</div>;

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 font-sans transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 bg-cool-grey/90 dark:bg-slate-950/90 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-900 dark:text-white"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {isRenewal ? "Renew Policy" : "Policy Details"}
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10 pb-32">
                {/* Status Card */}
                <div className={`rounded-3xl p-8 mb-8 border-2 flex flex-col md:flex-row justify-between items-center gap-6
                    ${policy.status === 'Active'
                        ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                        : 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30'}`}>
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center
                            ${policy.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                            {policy.status === 'Active' ? <Shield size={32} /> : <AlertTriangle size={32} />}
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Policy Status</p>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{policy.name}</h2>
                            <p className={`font-bold flex items-center gap-2 mt-1 ${policy.status === 'Active' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${policy.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                {policy.status} • #{policy.id}
                            </p>
                        </div>
                    </div>
                    {policy.status === 'Active' ? (
                        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expires In</p>
                            <p className="font-black text-slate-900 dark:text-white">253 Days</p>
                        </div>
                    ) : (
                        <button className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-rose-200 dark:shadow-rose-900/40 hover:bg-rose-700 active:scale-95 transition-all">
                            Renew Now
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-blue-500" /> Coverage Highlights
                            </h3>
                            <ul className="space-y-4">
                                {policy.coverage.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-full">
                                            <CheckCircle size={14} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <FileText size={20} className="text-orange-500" /> Policy Documents
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {policy.documents.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <FileText className="text-slate-400" size={20} />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{doc}</span>
                                        </div>
                                        <Download className="text-blue-600" size={16} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sum Insured</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">{policy.sumInsured}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium Paid</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">{policy.premiumPaid || policy.lastPremium}</p>
                                </div>
                                <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock size={16} className="text-slate-400" />
                                        <span className="text-xs font-bold text-slate-500">Timeline</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-bold">Issued</span>
                                            <span className="text-slate-900 dark:text-white font-black">{policy.startDate}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400 font-bold">Expiry</span>
                                            <span className="text-slate-900 dark:text-white font-black">{policy.expiryDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/claim/new")}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            File a Claim <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </main>

            {/* Bottom Sticky Action for Renewal */}
            {isRenewal && (
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
                        <div>
                            <p className="text-xs font-bold text-slate-500 mb-1">Renewal Premium</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{policy.lastPremium}</p>
                        </div>
                        <button className="flex-1 max-w-xs bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                            <CreditCard size={20} /> Pay & Renew Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
