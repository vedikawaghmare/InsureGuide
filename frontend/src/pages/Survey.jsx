import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Volume2, Save, Check, ArrowRight,
  PlayCircle, PauseCircle, HelpCircle
} from 'lucide-react';

const QUESTIONS = [
  {
    id: "occupation",
    question: "What is your main occupation?",
    options: [
      { label: "Farmer", icon: "🌾" },
      { label: "Daily Wage Worker", icon: "👷" },
      { label: "Shopkeeper", icon: "🏪" },
      { label: "Livestock Owner", icon: "🐄" },
      { label: "Other", icon: "💼" }
    ],
    type: "single"
  },
  {
    id: "family",
    question: "How many people are in your family?",
    options: [
      { label: "1-2 people", icon: "👤" },
      { label: "3-4 people", icon: "👥" },
      { label: "5-6 people", icon: "👨‍👩‍👧‍👦" },
      { label: "7 or more", icon: "👨‍👩‍👧‍👦👵" }
    ],
    type: "single"
  },
  {
    id: "crops",
    question: "What crops do you grow?",
    subtext: "Select all that apply",
    options: [
      { label: "Rice", icon: "🌾" },
      { label: "Wheat", icon: "🌾" },
      { label: "Cotton", icon: "☁️" },
      { label: "Sugarcane", icon: "🎋" },
      { label: "Vegetables", icon: "🥬" },
      { label: "Don't grow crops", icon: "❌" }
    ],
    type: "multiple"
  },
  {
    id: "concerns",
    question: "What are your main concerns?",
    subtext: "Select all that apply",
    options: [
      { label: "Crop Loss/Damage", icon: "🌧️" },
      { label: "Family Health", icon: "🏥" },
      { label: "Accidents", icon: "⚠️" },
      { label: "Animal Death", icon: "🐄" },
      { label: "Loan Repayment", icon: "💰" }
    ],
    type: "multiple"
  },
  {
    id: "income",
    question: "What is your monthly family income?",
    options: [
      { label: "Below ₹5,000", icon: "💵" },
      { label: "₹5,000 - ₹10,000", icon: "💵" },
      { label: "₹10,000 - ₹20,000", icon: "💵💵" },
      { label: "Above ₹20,000", icon: "💵💵💵" }
    ],
    type: "single"
  }
];

function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const step = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleSelect = (label) => {
    if (step.type === "single") {
      setAnswers({ ...answers, [step.id]: label });
    } else {
      const current = answers[step.id] || [];
      const newValue = current.includes(label)
        ? current.filter(i => i !== label)
        : [...current, label];
      setAnswers({ ...answers, [step.id]: newValue });
    }
  };

  const nextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate("/recommendations", { state: { answers } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* PROGRESS HEADER */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2"><ChevronLeft /></button>
          <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-gray-400">
            <Save size={14} /> SAVE
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-6 space-y-6">
        {/* QUESTION AREA */}
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">
            {step.question}
          </h2>
          {step.subtext && <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{step.subtext}</p>}

          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-2 bg-white border-2 border-gray-100 px-4 py-2 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all">
              <Volume2 size={18} /> Listen to Question
            </button>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-zinc-900"
            >
              {isAutoPlaying ? <PauseCircle size={18} className="text-zinc-900" /> : <PlayCircle size={18} />}
              Auto-play questions
            </button>
          </div>
        </div>

        {/* OPTIONS LIST */}
        <div className="grid grid-cols-1 gap-3">
          {step.options.map((opt) => {
            const isSelected = step.type === "single"
              ? answers[step.id] === opt.label
              : (answers[step.id] || []).includes(opt.label);

            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className={`flex items-center gap-5 p-5 rounded-3xl border-2 transition-all text-left
                                    ${isSelected
                    ? 'border-zinc-900 bg-zinc-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className={`font-bold flex-1 ${isSelected ? 'text-zinc-900' : 'text-gray-600'}`}>
                  {opt.label}
                </span>
                {isSelected && (
                  <div className="bg-zinc-900 rounded-full p-1">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTION FOOTER */}
      <div className="bg-white border-t p-6 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mx-auto w-full space-y-4">
          <div className="flex items-center justify-between px-2">
            <button className="text-gray-400 font-bold text-sm flex items-center gap-2 hover:text-zinc-900">
              <HelpCircle size={16} /> Not sure? Skip for now
            </button>
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 font-black text-zinc-900 hover:translate-x-1 transition-transform"
            >
              Next Question <ArrowRight size={20} />
            </button>
          </div>

          <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-black transition-all active:scale-[0.98] shadow-xl">
            <Save size={20} />
            Continue Later <span className="text-xs opacity-60 font-normal">(Progress auto-saved)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Survey;