import React from "react";
import {
    Phone,
    MessageCircle,
    Star,
    Globe,
    CheckCircle2,
    ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AgentsList() {
    const navigate = useNavigate();

    const agents = [
        {
            name: "Rajesh Kumar",
            expertise: ["Crop Insurance", "Health Insurance"],
            languages: ["Hindi", "Marathi"],
            rating: 4.8,
            phone: "1800123456"
        },
        {
            name: "Sunita Deshmukh",
            expertise: ["Life Insurance", "Health Insurance"],
            languages: ["Marathi", "English"],
            rating: 4.7,
            phone: "1800654321"
        },
        {
            name: "Amit Patel",
            expertise: ["Crop Insurance", "Equipment Insurance"],
            languages: ["Hindi", "Gujarati"],
            rating: 4.6,
            phone: "1800789456"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">

            {/* HEADER */}
            <div className="bg-white border-b px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
                <ChevronLeft
                    className="text-gray-600 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="flex-1 text-center font-bold text-gray-800">
                    Talk to a Verified Agent
                </h1>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

                {agents.map((agent, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-6 space-y-6"
                    >

                        {/* PROFILE */}
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {agent.name.split(" ").map(n => n[0]).join("")}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {agent.name}
                                    </h2>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-100">
                                        <CheckCircle2 size={12} /> Verified
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {agent.expertise.map((exp, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-bold border border-gray-200 rounded-full px-3 py-1 text-gray-600"
                                        >
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-medium">
                            <div className="flex items-center gap-2">
                                <Globe size={16} className="text-gray-400" />
                                <span>
                                    Speaks:{" "}
                                    <span className="font-bold text-gray-900">
                                        {agent.languages.join(", ")}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                <span>
                                    <span className="font-bold text-gray-900">
                                        {agent.rating}
                                    </span>{" "}
                                    Rating
                                </span>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a href={`tel:${agent.phone}`}>
                                <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all">
                                    <Phone size={20} /> Call Now (Free)
                                </button>
                            </a>

                            <button className="w-full border-2 border-gray-100 text-gray-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                                <MessageCircle size={20} /> WhatsApp Chat
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AgentsList;
