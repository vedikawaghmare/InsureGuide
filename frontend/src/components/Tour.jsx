import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Volume2 } from 'lucide-react';

function Tour({ isVisible, onClose, steps = [] }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentStepData = steps[currentStep];

    // Text to speech for tour steps
    const speakStep = (text) => {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            utterance.rate = 0.8;
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const skipTour = () => {
        localStorage.setItem('tourCompleted', 'true');
        onClose();
    };

    if (!isVisible || !currentStepData) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]" />
            
            {/* Highlight target element */}
            <div 
                className="fixed z-[101] pointer-events-none"
                style={{
                    top: currentStepData.target?.top || 0,
                    left: currentStepData.target?.left || 0,
                    width: currentStepData.target?.width || 0,
                    height: currentStepData.target?.height || 0,
                    border: '3px solid #3B82F6',
                    borderRadius: '12px',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                }}
            />

            {/* Tour tooltip */}
            <div 
                className="fixed z-[102] bg-white rounded-2xl shadow-2xl p-6 max-w-sm"
                style={{
                    top: (currentStepData.tooltip?.top || 100) + 'px',
                    left: (currentStepData.tooltip?.left || 100) + 'px',
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                            {currentStep + 1} of {steps.length}
                        </span>
                        <h3 className="font-bold text-gray-900">{currentStepData.title}</h3>
                    </div>
                    <button 
                        onClick={skipTour}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-gray-700 mb-3">{currentStepData.description}</p>
                    
                    {/* Voice button */}
                    <button
                        onClick={() => speakStep(currentStepData.description)}
                        disabled={isPlaying}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                        <Volume2 size={16} />
                        {isPlaying ? 'Playing...' : 'Listen to explanation'}
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={16} />
                        Previous
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={skipTour}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Skip Tour
                        </button>
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                            {currentStep < steps.length - 1 && <ArrowRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tour;