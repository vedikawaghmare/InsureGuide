import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Search,
    Shield,
    Heart,
    Wheat,
    Zap,
    Smartphone,
    Landmark,
    Filter,
    ArrowRight,
    Loader2
} from "lucide-react";

import JargonHelper from "../components/JargonHelper";

function SchemeCard({ scheme }) {
    const typeIcons = {
        'Crop': <Wheat className="text-amber-600" size={20} />,
        'Health': <Heart className="text-rose-600" size={20} />,
        'Life': <Zap className="text-blue-600" size={20} />,
        'Accident': <Shield className="text-emerald-600" size={20} />,
        'Livestock': <Smartphone className="text-purple-600" size={20} />,
        'Weather': <Smartphone className="text-sky-600" size={20} />
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-opacity-10 ${scheme.category === 'Government' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                    {typeIcons[scheme.type] || <Shield size={20} />}
                </div>
                {scheme.governmentSupport && (
                    <JargonHelper termKey="subsidized">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-md border border-green-100 dark:border-green-900/10 cursor-help">
                            {scheme.governmentSupport}
                        </span>
                    </JargonHelper>
                )}
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                {scheme.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex-1">
                {scheme.covers}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs">
                    <JargonHelper termKey="premium">
                        <span className="font-bold text-slate-400">Premium</span>
                    </JargonHelper>
                    <span className="font-black text-slate-900 dark:text-white">{scheme.premium}</span>
                </div>
                <div className="flex justify-between items-start text-xs">
                    <JargonHelper termKey="coverage">
                        <span className="font-bold text-slate-400">Coverage</span>
                    </JargonHelper>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-right max-w-[150px]">{scheme.benefits}</span>
                </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-bold text-sm hover:bg-black dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group/btn">
                Apply Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}

export default function Schemes() {
    const navigate = useNavigate();
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/insurance/plans");
                const data = await res.json();
                // backend returns { plans: { KEY: { ... } } }
                if (data.plans) {
                    setSchemes(Object.values(data.plans));
                }
            } catch (error) {
                console.error("Error fetching schemes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    const categories = ["All", "Crop", "Health", "Life", "Accident", "Livestock", "Weather"];

    const filteredSchemes = schemes.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scheme.covers.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || scheme.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-cool-grey dark:bg-slate-950 font-sans transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 bg-cool-grey/90 dark:bg-slate-950/90 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-900 dark:text-white"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Insurance Schemes
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by scheme name or coverage..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-12 pr-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-900 dark:text-white focus:border-blue-600 transition-all outline-none shadow-sm"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 h-14 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border-2
                                    ${selectedCategory === cat
                                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-blue-600 dark:border-blue-600'
                                        : 'bg-white text-slate-500 border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:border-slate-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                        <p className="font-bold text-slate-500">Fetching available schemes...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSchemes.map((scheme, idx) => (
                                <SchemeCard key={scheme.id || idx} scheme={scheme} />
                            ))}
                        </div>

                        {filteredSchemes.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="text-slate-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No schemes found</h3>
                                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
