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
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* HEADER */}
            <div className="bg-white border-b px-4 py-4 flex items-center sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="text-gray-600" size={24} />
                </button>
                <h1 className="flex-1 text-center font-bold text-gray-800 text-lg mr-8">Claim Assistance</h1>
            </div>

            <div className="max-w-4xl mx-auto w-full p-4 space-y-6">
                
                {/* DROPDOWN SECTION */}
                <div className="relative inline-block text-left">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center justify-between gap-3 bg-white border rounded-lg px-4 py-2 text-sm font-medium transition-all outline-none
                            ${isOpen ? 'border-blue-500 ring-2 ring-blue-50 shadow-sm' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        {selectedPolicy}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* DROPDOWN MENU */}
                    {isOpen && (
                        <>
                            {/* Backdrop to close dropdown when clicking outside */}
                            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                            
                            <div className="absolute left-0 mt-2 w-72 origin-top-left bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-150">
                                {policies.map((policy) => (
                                    <button
                                        key={policy}
                                        onClick={() => handleSelect(policy)}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors
                                            ${selectedPolicy === policy ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700 font-medium'}`}
                                    >
                                        {policy}
                                        {selectedPolicy === policy && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* MAIN ACTIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                        onClick={() => navigate("/claim/new")}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                                <FileText size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-gray-900">Start a New Claim</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Submit a new insurance claim with step-by-step guidance
                                </p>
                            </div>
                        </div>
                    </div>

                    <div 
                        onClick={() => navigate("/claim/track")}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                                <Search size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-gray-900">Track Existing Claim</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Check the status of your submitted claim
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="mt-auto border-t bg-white p-4">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                        onClick={() => navigate("/agents")}
                    >
                        <Phone size={18} />
                        Talk to Agent
                    </button>
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                        onClick={() => navigate("/home")}
                    >
                        <Home size={18} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClaimHome;