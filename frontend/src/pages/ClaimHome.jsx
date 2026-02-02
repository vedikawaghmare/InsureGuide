import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    FileText,
    Search,
    Phone,
    Home,
    ChevronDown,
    Check
} from "lucide-react";

function ClaimHome() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState("Select Policy");

    const policies = [
        "Family Health Protection Plan",
        "Crop Insurance Plan",
        "Livestock Coverage Plan",
        "Life Insurance Plan"
    ];

    const handleSelect = (policy) => {
        setSelectedPolicy(policy);
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-cool-grey flex flex-col font-sans">
            {/* SEARCH / HEADER */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Claim Assistance</h1>
                    <p className="text-slate-500 font-medium mt-1">Submit or track your insurance claims with ease.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-blue-700 uppercase">Claims Handled 24/7</span>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* MAIN CONTENT AREA */}
                <div className="lg:col-span-3 space-y-8">

                    {/* POLICY SELECTOR BOX */}
                    <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                                <FileText className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-none">Select Your Policy</h2>
                                <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">Required to proceed</p>
                            </div>
                        </div>

                        <div className="relative w-full max-w-xl">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`flex items-center justify-between w-full h-16 px-6 bg-slate-50 border-2 rounded-2xl text-lg font-bold transition-all outline-none
                                    ${isOpen ? 'border-slate-900 bg-white ring-4 ring-slate-100' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}
                            >
                                <span className={selectedPolicy === "Select Policy" ? 'text-slate-400' : 'text-slate-900'}>
                                    {selectedPolicy}
                                </span>
                                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                                    <div className="absolute left-0 mt-3 w-full bg-white border-2 border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
                                        {policies.map((policy) => (
                                            <button
                                                key={policy}
                                                onClick={() => handleSelect(policy)}
                                                className={`w-full text-left px-6 py-4 text-base flex items-center justify-between hover:bg-slate-50 transition-colors
                                                    ${selectedPolicy === policy ? 'text-slate-900 font-black bg-slate-50' : 'text-slate-600 font-bold'}`}
                                            >
                                                {policy}
                                                {selectedPolicy === policy && <Check size={18} className="text-slate-900" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ACTION GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            onClick={() => navigate("/claim/new")}
                            className="bg-white border-2 border-white rounded-[40px] p-10 shadow-sm hover:shadow-xl hover:border-slate-100 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="p-5 bg-slate-900 w-fit rounded-3xl text-white shadow-lg group-hover:rotate-6 transition-transform">
                                    <FileText size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900">Start a New Claim</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Submit documents and details for a new medical, crop, or accidental insurance claim.
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center gap-2 text-slate-900 font-bold">
                                    File now <ChevronLeft size={16} className="rotate-180" />
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate("/claim/track")}
                            className="bg-white border-2 border-white rounded-[40px] p-10 shadow-sm hover:shadow-xl hover:border-slate-100 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="p-5 bg-slate-900 w-fit rounded-3xl text-white shadow-lg group-hover:-rotate-6 transition-transform">
                                    <Search size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900">Track Ongoing Claim</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Check the status of your submitted request, view officer comments, and upload missing docs.
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center gap-2 text-slate-900 font-bold">
                                    View status <ChevronLeft size={16} className="rotate-180" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR: HELP & GUIDANCE */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            Claim Tips
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-slate-900">1</div>
                                <p className="text-sm font-bold text-slate-600 leading-snug">Take clear photos of all hospital bills and reports.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-slate-900">2</div>
                                <p className="text-sm font-bold text-slate-600 leading-snug">Keep your Aadhaar card ready for verification.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-slate-900">3</div>
                                <p className="text-sm font-bold text-slate-600 leading-snug">File within 48 hours for faster processing.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xl font-black mb-4 relative z-10">Need Help?</h3>
                        <p className="text-white/60 text-sm font-medium mb-6 relative z-10 leading-relaxed">
                            Our agents are online to help you file the correct documents for your claim.
                        </p>
                        <button
                            onClick={() => navigate("/agents")}
                            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm hover:bg-white/90 active:scale-95 transition-all relative z-10 flex items-center justify-center gap-2"
                        >
                            <Phone size={18} /> Call Specialist
                        </button>
                    </div>

                    <button
                        onClick={() => navigate("/home")}
                        className="w-full flex items-center justify-center gap-2 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                    >
                        <ChevronLeft size={18} /> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClaimHome;