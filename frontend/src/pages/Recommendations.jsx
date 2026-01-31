import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, HeartPulse, Wheat, AlertTriangle, ChevronLeft } from "lucide-react";

function Recommendations() {
    const navigate = useNavigate();
    const location = useLocation();
    const answers = location.state?.answers || {};

    // 🧠 Recommendation Logic
    const recommendations = [];

    if (
        answers.occupation === "Farmer" ||
        (answers.crops && answers.crops.length > 0)
    ) {
        recommendations.push({
            title: "Crop Insurance",
            desc: "Protects you from crop loss due to flood, drought, or pests.",
            icon: <Wheat className="text-green-600" />,
        });
    }

    if (
        answers.concerns?.includes("Family Health") ||
        answers.family
    ) {
        recommendations.push({
            title: "Health Insurance",
            desc: "Covers hospital bills and medical emergencies for your family.",
            icon: <HeartPulse className="text-red-500" />,
        });
    }

    if (answers.occupation === "Livestock Owner") {
        recommendations.push({
            title: "Livestock Insurance",
            desc: "Protects animals from illness, accidents, or death.",
            icon: <ShieldCheck className="text-blue-600" />,
        });
    }

    if (
        answers.concerns?.includes("Accidents") ||
        answers.occupation === "Daily Wage Worker"
    ) {
        recommendations.push({
            title: "Accident Insurance",
            desc: "Provides financial support in case of accidental injury or death.",
            icon: <AlertTriangle className="text-orange-500" />,
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>
                    <h1 className="text-xl font-bold">Recommended Insurance Plans</h1>
                </div>

                <p className="text-gray-600 text-sm">
                    Based on your answers, these insurance plans are best for you:
                </p>

                {/* RECOMMENDATION CARDS */}
                <div className="space-y-4">
                    {recommendations.map((rec, i) => (
                        <div
                            key={i}
                            className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex gap-4 shadow-sm"
                        >
                            <div className="p-3 bg-gray-50 rounded-xl">
                                {rec.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{rec.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{rec.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-6 space-y-3">
                    <button
                        onClick={() => navigate("/agents")}
                        className="w-full bg-black text-white py-4 rounded-2xl font-bold"
                    >
                        📞 Talk to Insurance Agent
                    </button>

                    <button
                        onClick={() => navigate("/home")}
                        className="w-full border-2 border-black py-4 rounded-2xl font-bold"
                    >
                        ⬅ Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Recommendations;
