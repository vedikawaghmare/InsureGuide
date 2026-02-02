import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    FileText,
    Download,
    Phone,
    MessageCircle
} from "lucide-react";

function TrackClaim() {
    const navigate = useNavigate();
    const [claimId, setClaimId] = useState("");
    const [searchedClaim, setSearchedClaim] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const mockClaims = [
        {
            id: "CLM2024001",
            policy: "Family Health Protection",
            status: "In Progress",
            date: "Jan 15, 2024",
            amount: "₹45,000",
            currentStep: 2
        },
        {
            id: "CLM2024005",
            policy: "Crop Insurance - Rice",
            status: "Approved",
            date: "Dec 10, 2023",
            amount: "₹1,20,000",
            currentStep: 4
        }
    ];

    const handleSearch = () => {
        if (!claimId) return;
        setIsSearching(true);
        // Simulate API lookup
        setTimeout(() => {
            const found = mockClaims.find(c => c.id === claimId) || {
                id: claimId,
                policy: "Direct Accident Coverage",
                status: "Pending Review",
                date: new Date().toLocaleDateString(),
                amount: "Checking...",
                currentStep: 1
            };
            setSearchedClaim(found);
            setIsSearching(false);
        }, 800);
    };

    const steps = [
        { id: 1, name: "Submitted", icon: <FileText size={18} /> },
        { id: 2, name: "Under Review", icon: <Clock size={18} /> },
        { id: 3, name: "Officer Inspection", icon: <Search size={18} /> },
        { id: 4, name: "Final Decision", icon: <CheckCircle2 size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-cool-grey flex flex-col font-sans">
            {/* HEADER */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <ChevronLeft className="text-slate-900" size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Track Your Claim</h1>
                        <p className="text-slate-500 font-medium">Get real-time updates on your insurance requests.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                        <Download size={16} /> Export History
                    </button>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* MAIN AREA: SEARCH & TRACKING */}
                <div className="lg:col-span-3 space-y-8">

                    {/* SEARCH BOX */}
                    <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 mb-6">Enter Claim Identity</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={claimId}
                                    onChange={(e) => setClaimId(e.target.value)}
                                    placeholder="Enter Claim ID (e.g. CLM2024001)"
                                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold text-slate-900 focus:bg-white focus:border-slate-900 transition-all outline-none"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="h-16 px-10 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3"
                            >
                                {isSearching ? "Searching..." : "Track Status"}
                            </button>
                        </div>
                    </div>

                    {/* SEARCH RESULTS / TIMELINE */}
                    {searchedClaim && (
                        <div className="bg-white border-2 border-slate-900/5 rounded-3xl p-8 shadow-xl animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0"></div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Current Claim</h3>
                                    <p className="text-2xl font-black text-slate-900">{searchedClaim.id} — {searchedClaim.policy}</p>
                                </div>
                                <div className="px-5 py-2 bg-blue-50 border border-blue-100 rounded-full">
                                    <span className="text-sm font-black text-blue-700 uppercase">{searchedClaim.status}</span>
                                </div>
                            </div>

                            {/* VISUAL TIMELINE */}
                            <div className="relative z-10 py-10">
                                <div className="flex items-center justify-between">
                                    {steps.map((step, idx) => {
                                        const isCompleted = searchedClaim.currentStep >= step.id;
                                        const isCurrent = searchedClaim.currentStep === step.id;

                                        return (
                                            <div key={step.id} className="flex-1 flex flex-col items-center group relative">
                                                {/* Connecting Line */}
                                                {idx < steps.length - 1 && (
                                                    <div className={`absolute top-6 left-1/2 w-full h-1 -z-10 ${searchedClaim.currentStep > step.id ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
                                                )}

                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-slate-900 text-white shadow-lg lg:scale-110' : 'bg-white border-2 border-slate-100 text-slate-300'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle2 size={24} /> : step.icon}
                                                </div>

                                                <p className={`mt-4 text-xs font-black uppercase tracking-tight text-center ${isCompleted ? 'text-slate-900' : 'text-slate-400'
                                                    }`}>
                                                    {step.name}
                                                </p>
                                                {isCurrent && (
                                                    <div className="mt-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full animate-bounce">
                                                        Active
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Submitted On</p>
                                    <p className="font-bold text-slate-900">{searchedClaim.date}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Estimated Amount</p>
                                    <p className="font-bold text-slate-900">{searchedClaim.amount}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Officer Notes</p>
                                        <p className="font-bold text-slate-900">View 2 Comments</p>
                                    </div>
                                    <MessageCircle className="text-slate-400 group-hover:text-slate-900" size={20} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MOCK HISTORY LIST */}
                    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            Recent Claims History
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-slate-50">
                                        <th className="text-left py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Claim ID</th>
                                        <th className="text-left py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Policy Name</th>
                                        <th className="text-left py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="text-left py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="text-right py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {mockClaims.map((claim) => (
                                        <tr key={claim.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-5 font-black text-slate-900">{claim.id}</td>
                                            <td className="py-5 font-bold text-slate-600">{claim.policy}</td>
                                            <td className="py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${claim.status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                                                    }`}>
                                                    {claim.status}
                                                </span>
                                            </td>
                                            <td className="py-5 font-medium text-slate-500 italic text-sm">{claim.date}</td>
                                            <td className="py-5 text-right">
                                                <button
                                                    onClick={() => { setClaimId(claim.id); handleSearch(); }}
                                                    className="px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-black text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR: CONTACTS & HELP */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                        <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                            <AlertCircle className="text-blue-600" size={20} />
                            Quick Support
                        </h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                            Problems with your ID or status? Contact our helpdesk for direct assistance.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase">Call Toll Free</p>
                                    <p className="font-bold text-slate-900">1800-456-7890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                                    <MessageCircle size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase">WhatsApp Us</p>
                                    <p className="font-bold text-slate-900">+91 90000 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-dash border-slate-200 rounded-3xl p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto">
                            <FileText size={24} className="text-slate-400" />
                        </div>
                        <h4 className="font-black text-slate-900 tracking-tight">Need a new claim?</h4>
                        <p className="text-xs font-medium text-slate-500">You can file a new claim for different policies here.</p>
                        <button
                            onClick={() => navigate("/claim/new")}
                            className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm hover:border-slate-900 transition-all"
                        >
                            Start New Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackClaim;
