import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ShieldCheck, HeartPulse, Wheat, AlertTriangle, ChevronLeft, ChevronDown, ChevronUp, Volume2, CreditCard, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchSurveys } from "../services/api";

function Recommendations() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [answers, setAnswers] = useState(location.state?.answers || {});
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => {
        if (id && Object.keys(answers).length === 0) {
            const getFamilyData = async () => {
                setLoading(true);
                try {
                    const res = await fetchSurveys();
                    const family = res.data.data.find(s => s._id === id);
                    if (family) {
                        // Map database fields to survey answer structure
                        setAnswers({
                            occupation: family.cropType === "Primary" ? "Farmer" : family.cropType,
                            crops: [family.cropType],
                            landSize: family.landSize,
                            ...family.answers // If detailed answers exist
                        });
                    }
                } catch (err) {
                    console.error("Error fetching family data", err);
                } finally {
                    setLoading(false);
                }
            };
            getFamilyData();
        }
    }, [id, answers]);

    // Text to speech for plan details
    const speakPlanDetails = (plan) => {
        if ('speechSynthesis' in window) {
            const text = `${plan.title}. Premium: ${plan.premium}. Coverage: ${plan.coverage}. Benefits: ${plan.benefits}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Enhanced recommendation logic with detailed plans
    const recommendations = [];

    if (
        answers.occupation === "Farmer" ||
        (answers.crops && answers.crops.length > 0)
    ) {
        recommendations.push({
            title: "PM Fasal Bima Yojana (PMFBY)",
            desc: "Complete protection for your crops against weather damage.",
            icon: <Wheat className="text-amber-600" />,
            premium: "Only 1.5% - 2% of crop value",
            coverage: "Full crop value protection",
            benefits: "• Money back for drought, flood, pests\n• Government pays most of the cost\n• Direct money transfer to your bank\n• Covers crop loss after harvest too",
            documents: "Land papers (7/12 उतारा), Aadhaar, Sowing proof",
            whyRecommended: "As a farmer, this plan protects your entire harvest investment."
        });
    }

    if (
        answers.concerns?.includes("Family Health") ||
        answers.family
    ) {
        recommendations.push({
            title: "Ayushman Bharat (PM-JAY)",
            desc: "Free hospital treatment for your entire family.",
            icon: <HeartPulse className="text-rose-600" />,
            premium: "Completely free for eligible families",
            coverage: "₹5,00,000 per family per year",
            benefits: "• No payment needed at hospitals\n• Covers major surgeries and treatments\n• No limit on family members or age\n• Old health problems covered from day 1",
            documents: "PMJAY Card/Golden Card, Aadhaar, Ration Card",
            whyRecommended: "Get the best medical care for your family without worrying about money."
        });
    }

    if (answers.occupation === "Livestock Owner" || answers.concerns?.includes("Animal Death")) {
        recommendations.push({
            title: "Kisan Livestock Insurance",
            desc: "Money back if your cattle or animals die.",
            icon: <ShieldCheck className="text-purple-600" />,
            premium: "₹500 - ₹2,000 per animal",
            coverage: "Full animal value (up to ₹80,000 per cattle)",
            benefits: "• Money back if animal dies from disease or accident\n• Quick settlement with doctor's report\n• Covers Cattle, Buffalo, Goat, Sheep\n• Payment within 15 days of claim",
            documents: "Animal health certificate, Ear tag photo, Owner Aadhaar",
            whyRecommended: "Protects your valuable animals that help earn your living."
        });
    }

    if (
        answers.concerns?.includes("Accidents") ||
        answers.occupation === "Daily Wage Worker" ||
        answers.occupation === "Shopkeeper"
    ) {
        recommendations.push({
            title: "PM Suraksha Bima Yojana (PMSBY)",
            desc: "Money for your family if you get hurt in an accident.",
            icon: <AlertTriangle className="text-emerald-500" />,
            premium: "Only ₹20 per year",
            coverage: "₹2,00,000 for death/serious injury",
            benefits: "• 24/7 accident protection anywhere in world\n• Auto payment from your bank account\n• Easy claim process at your local bank\n• ₹1 Lakh for partial injury",
            documents: "Bank Account details, Aadhaar card",
            whyRecommended: "Very cheap accident protection for people who work actively."
        });
    }

    // Add Life Insurance for everyone
    recommendations.push({
        title: "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
        desc: "Money for your family if something happens to you.",
        icon: <ShieldCheck className="text-blue-600" />,
        premium: "₹436 per year",
        coverage: "₹2,00,000 (Life Cover)",
        benefits: "• Money for family if you die for any reason\n• Easy signup through your bank\n• No health checkup needed\n• Simple life insurance for family security",
        documents: "Aadhaar Card, Nominee details, Bank Account",
        whyRecommended: "Basic life insurance keeps your family safe even when you're not there."
    });

    if (loading) return (
        <div className="min-h-screen bg-cool-grey flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-slate-900 animate-spin mx-auto mb-4" />
                <p className="font-bold text-slate-600">Loading recommendations...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cool-grey px-4 lg:px-6 py-6 font-sans">
            <div className="w-full space-y-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-cool-grey/95 backdrop-blur-md py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                            <ChevronLeft className="text-slate-900" />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-900">Your Personalized Insurance Plans</h1>
                    </div>

                    <button
                        onClick={() => navigate("/agents")}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg"
                    >
                        📞 Talk to Expert <span className="hidden md:inline text-xs font-normal opacity-80">(Free)</span>
                    </button>
                </div>

                {/* INFO BANNER */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <HeartPulse className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Customized Recommendations</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Based on your survey answers, we've selected these plans specifically for your needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RECOMMENDATION CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((rec, i) => (
                        <div
                            key={i}
                            className={`bg-white border-2 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${expandedCard === i ? 'border-slate-900 md:col-span-2 lg:col-span-3' : 'border-slate-100'}`}
                        >
                            {/* Card Header */}
                            <div className="p-6">
                                <div className="flex gap-4 items-start">
                                    <div className={`p-4 rounded-2xl flex-shrink-0 ${i % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'}`}>
                                        {rec.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-black text-slate-900 text-xl">{rec.title}</h3>
                                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{rec.desc}</p>
                                            </div>
                                            <div className="text-left xl:text-right mt-2 xl:mt-0 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 xl:bg-transparent xl:border-0 xl:p-0">
                                                <p className="text-lg font-black text-slate-900">{rec.premium}</p>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">per year</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-50">
                                            <button
                                                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                                                className="flex items-center gap-2 text-slate-900 hover:text-blue-600 text-sm font-bold bg-slate-100 px-4 py-2 rounded-lg transition-colors border border-slate-200 hover:border-blue-200 hover:bg-blue-50"
                                            >
                                                {expandedCard === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                {expandedCard === i ? 'Hide Details' : 'View Full Details'}
                                            </button>

                                            <button
                                                onClick={() => speakPlanDetails(rec)}
                                                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold px-2"
                                            >
                                                <Volume2 size={16} />
                                                Listen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedCard === i && (
                                <div className="border-t border-slate-100 p-6 bg-slate-50/50 animate-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Coverage Details */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                                                <ShieldCheck size={20} className="text-green-600" />
                                                Coverage & Benefits
                                            </h4>
                                            <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-4 shadow-sm">
                                                <p className="text-sm text-slate-600 mb-3 pb-3 border-b border-slate-100">
                                                    <strong className="text-slate-900 block mb-1">Maximum Coverage</strong>
                                                    <span className="text-lg">{rec.coverage}</span>
                                                </p>
                                                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                                                    <strong className="text-slate-900 block mb-2">Key Benefits</strong>
                                                    {rec.benefits}
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Why recommended:</strong> {rec.whyRecommended}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Documents & Process */}
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                                                <FileText size={20} className="text-blue-600" />
                                                Required Documents
                                            </h4>
                                            <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-4 shadow-sm">
                                                <p className="text-sm text-slate-700 font-medium">{rec.documents}</p>
                                            </div>

                                            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                                <p className="text-sm text-green-800 font-bold mb-2">✅ Easy Application Process:</p>
                                                <p className="text-sm text-green-700 leading-relaxed">
                                                    1. Talk to our agent (5 mins)<br />
                                                    2. Submit documents (via WhatsApp)<br />
                                                    3. Get policy in 24-48 hours
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                                <button
                                                    onClick={() => navigate("/agents", { state: { selectedPlan: rec.title } })}
                                                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <CreditCard size={18} />
                                                    Apply Now
                                                </button>
                                                <button
                                                    onClick={() => navigate("/agents", { state: { selectedPlan: rec.title, action: 'question' } })}
                                                    className="px-6 py-3 border-2 border-slate-200 bg-white text-slate-700 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors"
                                                >
                                                    Ask Questions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Help/Consultation Card as the last item in grid */}
                    <div className="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-6 flex flex-col justify-center items-start shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-yellow-100 p-3 rounded-xl mb-4 text-yellow-700">
                            <Volume2 size={24} />
                        </div>
                        <h4 className="font-bold text-yellow-900 text-lg mb-2">Need Help Deciding?</h4>
                        <p className="text-sm text-yellow-800 mb-6 leading-relaxed">
                            Our insurance experts can explain each plan in detail, help you compare options,
                            and guide you through the application process - all for free!
                        </p>
                        <button
                            onClick={() => navigate("/agents")}
                            className="w-full bg-yellow-400 text-yellow-950 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
                        >
                            Get Free Expert Guidance
                        </button>
                    </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="pt-8 pb-20 flex justify-center">
                    <button
                        onClick={() => navigate("/home")}
                        className="text-slate-500 font-bold hover:text-slate-900 flex items-center gap-2 transition-colors"
                    >
                        ⬅ Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Recommendations;
