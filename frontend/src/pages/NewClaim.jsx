import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Upload,
    Camera,
    File,
    ChevronDown,
    Check
} from "lucide-react";

function NewClaim() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState("Select Policy");

    const policies = [
        "Family Health Protection Plan",
        "Crop Insurance Plan",
        "Livestock Coverage Plan",
        "Life Insurance Plan"
    ];

    const requiredDocs = [
        "Government-issued ID proof (Aadhaar/Voter ID)",
        "Policy document copy",
        "Medical bills and receipts (for health claims)",
        "Land records (for crop claims)",
        "Death certificate (for life insurance claims)"
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* HEADER */}
            <div className="bg-white border-b px-4 py-4 flex items-center sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="text-gray-600" size={24} />
                </button>
                <h1 className="flex-1 text-center font-bold text-gray-800 text-lg mr-8">Claim Assistance</h1>
            </div>

            <div className="max-w-3xl mx-auto w-full p-4 space-y-6">

                {/* POLICY DROPDOWN */}
                <div className="relative inline-block text-left">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 outline-none"
                    >
                        {selectedPolicy}
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                            {policies.map((policy) => (
                                <button
                                    key={policy}
                                    onClick={() => { setSelectedPolicy(policy); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 font-medium text-gray-700 border-b last:border-0"
                                >
                                    {policy}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* STEP 1: REQUIRED DOCUMENTS */}
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            1
                        </div>
                        <h3 className="font-bold text-gray-900">Required Documents</h3>
                    </div>

                    <div className="space-y-4">
                        {requiredDocs.map((doc, index) => (
                            <label key={index} className="flex items-start gap-3 group cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-zinc-900 checked:border-zinc-900 transition-all cursor-pointer"
                                    />
                                    <Check className="absolute w-3.5 h-3.5 text-white left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                                <span className="text-sm text-gray-600 font-medium leading-tight group-hover:text-gray-900">
                                    {doc}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* STEP 2: UPLOAD DOCUMENTS */}
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-50">
                            2
                        </div>
                        <h3 className="font-bold text-gray-900">Upload Documents</h3>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                        <Upload size={40} className="text-gray-400" />
                        <div className="space-y-1">
                            <p className="font-bold text-gray-900">Upload your documents</p>
                            <p className="text-sm text-gray-400 font-medium">Click to browse or drag and drop</p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                <Camera size={18} />
                                Take Photo
                            </button>
                            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                <File size={18} />
                                Choose File
                            </button>
                        </div>
                    </div>

                    <button className="w-full bg-gray-400 text-white py-4 rounded-2xl font-bold shadow-md cursor-not-allowed transition-all">
                        Continue to Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewClaim;