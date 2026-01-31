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
function ActionCard({ icon, label, bg ,onClick}) {
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
        <div className="min-h-screen bg-gray-50 flex justify-center">
            <div className="w-full max-w-[900px] bg-white flex flex-col shadow-xl border-x border-gray-200">

                {/* HEADER */}
                <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div>
                            <h2 className="font-bold text-lg text-gray-800 leading-none">Virtual Agent</h2>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-semibold">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                {connectionStatus === 'online' ? 'Connected (Online AI)' : 
                                 connectionStatus === 'offline' ? 'Connected (Offline AI)' :
                                 connectionStatus === 'fallback' ? 'Connected (Knowledge Base)' : 'Connection Issues'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Volume2 size={20} className="text-gray-400 cursor-pointer hover:text-black" />
                        <button className="flex items-center gap-2 text-sm border-2 px-3 py-1.5 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                            <Globe size={16} />
                            English
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-8 pb-32">

                    {/* INTRO CARDS */}
                    <div className="space-y-4 max-w-[80%]">
                        <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 shadow-sm">
                            <p className="text-gray-800 text-base">
                                Namaste! I’m your insurance helper. I can speak in your language and help you understand insurance.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 shadow-sm">
                            <p className="text-gray-800 text-base">
                                You can talk to me using the microphone or type below. What would you like to do?
                            </p>
                        </div>
                    </div>

                    {/* ACTION GRID */}
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                            What would you like to do?
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <ActionCard icon={<FileText />} label="Answer 5 Questions" bg="blue" onClick={() => navigate("/survey")}/>
                            <ActionCard icon={<Volume2 />} label="See Your Plans" bg="yellow" onClick={() => navigate("/recommendations")}/>
                            <ActionCard icon={<MapPin />} label="Is My Area Safe?" bg="green" onClick={() => navigate("/risk-map")}/>
                            <ActionCard icon={<Phone />} label="Call Expert Now" bg="orange" onClick={() => navigate("/agents")}/>
                            <ActionCard icon={<Upload />} label="Upload Policy Photo" bg="purple" onClick={() => navigate("/claim/new")}/>
                            <ActionCard icon={<IndianRupee />} label="Get Money Back" bg="red" onClick={() => navigate("/claim")}/>
                            <ActionCard icon={<Users />} label="Facilitator View" bg="purple" onClick={() => navigate("/facilitator")}/>
                            <ActionCard icon={<MapPin />} label="Location Insurance" bg="green" onClick={() => navigate("/location-insurance")}/>
                        </div>
                    </div>


                    {/* CHAT MESSAGES */}
                    <div className="space-y-4 pt-4 border-t border-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
                                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm border ${msg.from === "bot"
                                    ? "bg-white border-gray-100 text-gray-800 rounded-tl-none"
                                    : "bg-blue-600 text-white border-blue-500 rounded-tr-none"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* INPUT */}
                <div className="sticky bottom-0 bg-white border-t p-4 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
                    <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-black transition-all shadow-lg active:scale-[0.98]">
                        <Mic size={22} />
                        Press to Speak (Voice Input)
                    </button>

                    <div className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Or type your message..."
                            className="flex-1 border-2 border-gray-100 rounded-2xl px-5 py-3 text-base outline-none focus:border-blue-500 transition-all shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-slate-800 text-white p-4 rounded-2xl hover:bg-black transition-all active:scale-90"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VirtualAgent;
