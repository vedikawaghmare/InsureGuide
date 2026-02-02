import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Volume2, Save, Check, ArrowRight,
  PlayCircle, PauseCircle, HelpCircle, Shield
} from 'lucide-react';
import { submitSurvey } from '../services/api';

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
    type: "single",
    helpText: "Knowing your job helps us suggest relevant insurance plans. For example, farmers need crop insurance, while shopkeepers might need property insurance.",
    benefits: ["Customized plan suggestions", "Subsidy checks", "Relevant risk coverage"]
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
    type: "single",
    helpText: "Family size determines the health coverage amount you might need. Larger families often benefit from 'Family Floater' plans.",
    benefits: ["Adequate health cover", "Family floater discounts", "Emergency planning"]
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
    type: "multiple",
    helpText: "Different crops have different risks (drought vs. flood). Specifying your crops helps us find the exact scheme like PMFBY for you.",
    benefits: ["PMFBY scheme mapping", "Crop-specific riders", "Seasonal risk alerts"]
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
    type: "multiple",
    helpText: "Tell us what keeps you awake at night. We prioritize plans that cover your biggest worries first.",
    benefits: ["Priority-based plans", "Gap analysis", "Peace of mind"]
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
    type: "single",
    helpText: "This helps us find plans that fit your budget. We focus on low-premium, high-coverage government schemes for lower income brackets.",
    benefits: ["Budget-friendly premiums", "Government aid check", "Premium subsidies"]
  }
];

function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [validationError, setValidationError] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('surveyDraft');
    if (savedDraft) {
      const { answers: savedAnswers, currentStep: savedStep } = JSON.parse(savedDraft);
      setAnswers(savedAnswers || {});
      setCurrentStep(savedStep || 0);
    }
  }, []);

  const step = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleSelect = (label) => {
    let newAnswers;
    if (step.type === "single") {
      newAnswers = { ...answers, [step.id]: label };
    } else {
      const current = answers[step.id] || [];
      const newValue = current.includes(label)
        ? current.filter(i => i !== label)
        : [...current, label];
      newAnswers = { ...answers, [step.id]: newValue };
    }
    setAnswers(newAnswers);
    setValidationError(false);
  };

  const handleSaveDraft = () => {
    const draft = {
      answers,
      currentStep,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem('surveyDraft', JSON.stringify(draft));
    setSaveStatus("Saved!");
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const nextQuestion = async () => {
    // Validation: Check if the current question has an answer
    const currentAnswer = answers[step.id];
    const isAnswered = step.type === "single"
      ? !!currentAnswer
      : (currentAnswer && currentAnswer.length > 0);

    if (!isAnswered) {
      setValidationError(true);
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Auto-save progress
      const draft = { answers, currentStep: currentStep + 1 };
      localStorage.setItem('surveyDraft', JSON.stringify(draft));
    } else {
      // Final step: Save to database before navigating
      try {
        const surveyData = {
          userName: "Guest User",
          village: "General",
          landSize: answers.income === "Above ₹20,000" ? 10 : 2,
          cropType: (answers.crops && answers.crops[0]) || "Primary",
          responses: answers
        };
        await submitSurvey(surveyData);
        localStorage.removeItem('surveyDraft'); // Clear draft on success
        navigate("/recommendations", { state: { answers } });
      } catch (err) {
        console.error("Error saving survey", err);
        navigate("/recommendations", { state: { answers } });
      }
    }
  };

  return (
    <div className="min-h-screen bg-cool-grey flex flex-col font-sans">
      {/* PROGRESS HEADER */}
      <div className="bg-cool-grey/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors"><ChevronLeft className="text-slate-900" /></button>
          <div className="flex-1 max-w-md mx-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</span>
              <span className="text-xs font-bold text-slate-900">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Save size={14} /> {saveStatus || "SAVE"}
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN - QUESTIONS */}
        <div className="lg:col-span-2 space-y-10">
          {/* QUESTION AREA */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {step.question}
            </h2>
            {validationError && (
              <p className="text-red-500 font-bold text-sm animate-bounce">
                ⚠️ Please select an answer before continuing
              </p>
            )}
            {step.subtext && <p className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-100 inline-block px-4 py-1 rounded-full">{step.subtext}</p>}

            <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all text-slate-700">
                <Volume2 size={18} /> Listen to Question
              </button>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-2xl transition-all border ${isAutoPlaying ? 'bg-slate-900 text-white border-slate-900' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100'}`}
              >
                {isAutoPlaying ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                Auto-play
              </button>
            </div>
          </div>

          {/* OPTIONS LIST */}
          <div className={`grid gap-4 ${step.options.length > 5 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} w-full`}>
            {step.options.map((opt) => {
              const isSelected = step.type === "single"
                ? answers[step.id] === opt.label
                : (answers[step.id] || []).includes(opt.label);

              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  className={`flex items-center gap-5 p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group
                                        ${isSelected
                      ? 'border-slate-900 bg-white shadow-xl scale-[1.02]'
                      : 'border-white bg-white hover:border-slate-200 shadow-sm hover:shadow-md'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${isSelected ? 'bg-slate-100' : 'bg-cool-grey group-hover:bg-slate-50'}`}>
                    {opt.icon}
                  </div>
                  <span className={`font-bold text-lg flex-1 ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN - HELP & BENEFITS */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-32">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <HelpCircle className="text-blue-600" size={24} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Why we ask this?</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {step.helpText}
            </p>

            <div className="space-y-4">
              {step.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="bg-green-100 p-1 rounded-full mt-1"><Check size={12} className="text-green-700" /></div>
                  <p className="text-sm text-slate-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Shield size={20} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Data Privacy</p>
                  <p className="text-[10px] text-slate-500">Your answers are private & secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ACTION FOOTER */}
      <div className="bg-white border-t border-slate-200 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center gap-4 justify-between">
          <button className="text-slate-400 font-bold text-sm flex items-center gap-2 hover:text-slate-900 transition-colors">
            <HelpCircle size={18} /> Need help? Ask the Agent
          </button>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={handleSaveDraft}
              className="flex-1 md:flex-none px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              {saveStatus || "Save Draft"}
            </button>
            <button
              onClick={nextQuestion}
              className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Next Question <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;