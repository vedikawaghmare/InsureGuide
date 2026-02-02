import React, { useState } from "react";
import {
    Phone,
    MessageCircle,
    Star,
    Globe,
    CheckCircle2,
    ChevronLeft,
    Volume2,
    Shield,
    Award,
    Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AgentsList() {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [showVerificationTooltip, setShowVerificationTooltip] = useState(null);

    // Voice explanation for verification
    const speakVerification = () => {
        if ('speechSynthesis' in window) {
            const text = "This agent is approved by government and insurance company. They are licensed professionals who can help you safely.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    const agents = [
        {
            name: "Rajesh Kumar",
            expertise: ["Crop Insurance", "Health Insurance"],
            languages: ["Hindi", "Marathi"],
            rating: 4.8,
            phone: "1800123456",
            licenseNumber: "LIC/AGT/2023/001234",
            company: "Life Insurance Corporation",
            experience: "8 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Sunita Deshmukh",
            expertise: ["Life Insurance", "Health Insurance"],
            languages: ["Marathi", "English"],
            rating: 4.7,
            phone: "1800654321",
            licenseNumber: "HDFC/AGT/2023/005678",
            company: "HDFC Life Insurance",
            experience: "6 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Amit Patel",
            expertise: ["Crop Insurance", "Equipment Insurance"],
            languages: ["Hindi", "Gujarati"],
            rating: 4.6,
            phone: "1800789456",
            licenseNumber: "ICICI/AGT/2023/009012",
            company: "ICICI Prudential",
            experience: "5 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Priya Singh",
            expertise: ["Life Insurance", "Education Plans"],
            languages: ["Hindi", "English", "Punjabi"],
            rating: 4.9,
            phone: "1800555123",
            licenseNumber: "SBI/AGT/2023/004512",
            company: "SBI Life",
            experience: "10 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Vikram Malhotra",
            expertise: ["Vehicle Insurance", "Health Insurance"],
            languages: ["English", "Hindi"],
            rating: 4.5,
            phone: "1800999888",
            licenseNumber: "BAJAJ/AGT/2023/007890",
            company: "Bajaj Allianz",
            experience: "4 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Anjali Gupta",
            expertise: ["Crop Insurance", "Livestock Insurance"],
            languages: ["Hindi", "Bhojpuri"],
            rating: 4.8,
            phone: "1800333444",
            licenseNumber: "NIC/AGT/2023/002345",
            company: "National Insurance",
            experience: "7 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Mohammed Rao",
            expertise: ["Health Insurance", "Term Life"],
            languages: ["Urdu", "Hindi", "Telugu"],
            rating: 4.7,
            phone: "1800222111",
            licenseNumber: "MAX/AGT/2023/006789",
            company: "Max Life",
            experience: "9 years",
            verifiedBy: "IRDAI & Government of India"
        },
        {
            name: "Kavita Reddy",
            expertise: ["Property Insurance", "Crop Insurance"],
            languages: ["Telugu", "English"],
            rating: 4.6,
            phone: "1800777666",
            licenseNumber: "TATA/AGT/2023/001122",
            company: "Tata AIG",
            experience: "5 years",
            verifiedBy: "IRDAI & Government of India"
        }
    ];

    const filters = ["All", "Crop Insurance", "Health Insurance", "Life Insurance", "Vehicle Insurance"];

    const filteredAgents = selectedFilter === "All"
        ? agents
        : agents.filter(agent => agent.expertise.includes(selectedFilter));

    return (
        <div className="min-h-screen bg-cool-grey pb-10 font-sans">

            {/* HEADER */}
            <div className="bg-cool-grey/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30 justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                        <ChevronLeft className="text-slate-900" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Talk to a Verified Agent
                    </h1>
                </div>
            </div>

            {/* TRUST BANNER - Full Width */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                <div className="w-full flex items-center gap-4 justify-center md:justify-start">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">
                            Government Verified & Licensed Professionals
                        </p>
                        <p className="text-xs text-slate-500">
                            Approved by IRDAI • 100% Safe & Secure
                        </p>
                    </div>
                    <button
                        onClick={speakVerification}
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors ml-auto md:ml-0"
                        title="Listen to verification explanation"
                    >
                        <Volume2 size={18} />
                    </button>
                </div>
            </div>

            {/* FILTER SECTION */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 sticky top-20 z-20 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap
                                ${selectedFilter === filter
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full px-4 lg:px-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {filteredAgents.map((agent, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full group"
                        >

                            {/* PROFILE */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                    {agent.name.split(" ").map(n => n[0]).join("")}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-black text-slate-900 truncate pr-2">
                                            {agent.name}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowVerificationTooltip(showVerificationTooltip === index ? null : index)}
                                                className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-help"
                                            >
                                                <CheckCircle2 size={12} />
                                                Verified
                                                <Info size={10} />
                                            </button>

                                            {/* Verification Tooltip */}
                                            {showVerificationTooltip === index && (
                                                <div className="absolute left-0 top-8 bg-white border border-slate-200 rounded-xl p-4 shadow-xl z-20 w-64 animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Shield className="w-4 h-4 text-green-600" />
                                                        <span className="font-semibold text-slate-800 text-xs">Govt. Verified</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                                                        Approved by <strong>{agent.verifiedBy}</strong>.
                                                    </p>
                                                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                                                        <p className="text-[10px] text-slate-500 font-mono">
                                                            {agent.licenseNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                            <Star size={10} className="fill-amber-500" /> {agent.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPERTISE TAGS */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {agent.expertise.map((exp, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-bold border border-slate-100 bg-slate-50 rounded-full px-2 py-1 text-slate-600"
                                    >
                                        {exp}
                                    </span>
                                ))}
                            </div>

                            {/* LICENSE INFORMATION */}
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-4 h-4 text-blue-600" />
                                    <span className="font-bold text-xs text-blue-800 uppercase tracking-wider">Credentials</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-blue-900 text-xs flex justify-between">
                                        <span className="opacity-70">Company:</span>
                                        <span className="font-bold">{agent.company}</span>
                                    </p>
                                    <p className="text-blue-900 text-xs flex justify-between">
                                        <span className="opacity-70">Experience:</span>
                                        <span className="font-bold">{agent.experience}</span>
                                    </p>
                                    <p className="text-blue-900 text-xs flex justify-between pt-2 border-t border-blue-200/50">
                                        <span className="opacity-70">Speaks:</span>
                                        <span className="font-bold">{agent.languages.join(", ")}</span>
                                    </p>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <a href={`tel:${agent.phone}`} className="col-span-2 md:col-span-1">
                                    <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 text-sm shadow-md">
                                        <Phone size={16} /> Call
                                    </button>
                                </a>

                                <button className="col-span-2 md:col-span-1 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 text-sm bg-white">
                                    <MessageCircle size={16} /> Chat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AgentsList;
