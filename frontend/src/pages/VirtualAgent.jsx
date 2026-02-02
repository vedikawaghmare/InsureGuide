import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Mic,
    Send,
    Globe,
    Volume2,
    Phone,
    FileText,
    MapPin,
    IndianRupee,
    Upload,
    Users
} from "lucide-react";

/* ACTION CARD */
function ActionCard({ icon, label, bg, onClick }) {
    const colors = {
        blue: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
        yellow: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
        green: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
        orange: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
        purple: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
        red: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    };

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all active:scale-95 shadow-sm ${colors[bg]}`}
        >
            <div className="scale-125">{icon}</div>
            <span className="text-sm font-bold text-center leading-tight">{label}</span>
        </button>
    );
}

function VirtualAgent() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('online');
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    // Initialize session
    useEffect(() => {
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
    }, []);

    /* Auto scroll */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    /* SEND MESSAGE */
    const handleSend = async () => {
        if (!input.trim() || !sessionId) return;

        const userMessage = input;
        setMessages(prev => [...prev, { from: "user", text: userMessage }]);
        setInput("");

        // typing indicator
        setMessages(prev => [...prev, { from: "bot", text: "Typing..." }]);

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    userId: 'user_' + Date.now(),
                    sessionId
                }),
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev.slice(0, -1),
                { from: "bot", text: data.response || "I’m here to help you." }
            ]);
        } catch {
            setConnectionStatus('error');
            setMessages(prev => [
                ...prev.slice(0, -1),
                { from: "bot", text: "Network error. Please try again.", source: 'error' }
            ]);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-cool-grey flex flex-col relative w-full">
            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-cool-grey/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="font-bold text-lg text-slate-900 leading-none">Virtual Agent</h2>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-semibold">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            {connectionStatus === 'online' ? 'Connected (Online AI)' :
                                connectionStatus === 'offline' ? 'Connected (Offline AI)' :
                                    connectionStatus === 'fallback' ? 'Connected (Knowledge Base)' : 'Connection Issues'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Volume2 size={20} className="text-slate-400 cursor-pointer hover:text-slate-900 transition-colors" />
                    <button className="flex items-center gap-2 text-sm border border-slate-200 bg-white px-3 py-1.5 rounded-xl font-bold hover:bg-slate-50 transition-colors text-slate-700">
                        <Globe size={16} />
                        English
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-8 pb-32">

                {/* INTRO CARDS */}
                <div className="space-y-4 max-w-3xl">
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <p className="text-slate-800 text-base">
                            Namaste! I’m your InsureGuide Saathi. I can speak in your language and break down complex insurance words into simple terms you can easily understand.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <p className="text-slate-800 text-base">
                            You can talk to me using the microphone or type below. What would you like to do?
                        </p>
                    </div>
                </div>

                {/* ACTION GRID */}
                <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        What would you like to do?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActionCard icon={<FileText />} label="Answer 5 Questions" bg="blue" onClick={() => navigate("/survey")} />
                        <ActionCard icon={<Volume2 />} label="See Your Plans" bg="yellow" onClick={() => navigate("/recommendations")} />
                        <ActionCard icon={<MapPin />} label="Is My Area Safe?" bg="green" onClick={() => navigate("/risk-map")} />
                        <ActionCard icon={<Phone />} label="Call Expert Now" bg="orange" onClick={() => navigate("/agents")} />
                        <ActionCard icon={<Upload />} label="Upload Policy Photo" bg="purple" onClick={() => navigate("/claim/new")} />
                        <ActionCard icon={<IndianRupee />} label="Get Money Back" bg="red" onClick={() => navigate("/claim")} />
                        <ActionCard icon={<Users />} label="Facilitator View" bg="purple" onClick={() => navigate("/facilitator")} />
                        <ActionCard icon={<MapPin />} label="Location Insurance" bg="green" onClick={() => navigate("/location-insurance")} />
                    </div>
                </div>


                {/* CHAT MESSAGES */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
                            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm border ${msg.from === "bot"
                                ? "bg-white border-slate-100 text-slate-800 rounded-tl-none"
                                : "bg-slate-900 text-white border-slate-800 rounded-tr-none"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* INPUT */}
            <div className="absolute bottom-6 left-6 right-6 bg-white border border-slate-100 p-2 space-y-2 shadow-2xl rounded-3xl z-30 max-w-5xl mx-auto">
                <div className="flex gap-2">
                    <button className="bg-slate-100 text-slate-900 p-3 rounded-2xl hover:bg-slate-200 transition-all active:scale-95">
                        <Mic size={22} />
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message or ask for help..."
                        className="flex-1 bg-transparent px-3 text-base outline-none text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-slate-800 transition-all active:scale-90"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VirtualAgent;
