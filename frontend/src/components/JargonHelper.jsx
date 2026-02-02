import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const JARGON_DICTIONARY = {
    premium: {
        term: "Premium",
        simple: "The small cost you pay every year to keep your insurance alive. Like a small fee for big safety.",
        hindi: "बीमा चालू रखने के लिए आपके द्वारा हर साल दी जाने वाली छोटी राशि। सुरक्षा के लिए एक छोटा शुल्क।"
    },
    coverage: {
        term: "Coverage",
        simple: "The total money the company will pay you if something bad happens. It's your safety shield.",
        hindi: "अगर कुछ गलत होता है तो कंपनी आपको जो कुल पैसा देगी। यह आपकी सुरक्षा ढाल है।"
    },
    benefits: {
        term: "Benefits",
        simple: "What you get back: money for hospital bills, medicine, or lost crops.",
        hindi: "आपको क्या मिलता है: अस्पताल के बिल, दवा या खोई हुई फसलों के लिए पैसा।"
    },
    cashless: {
        term: "Cashless",
        simple: "You don't need to pay at the hospital. The insurance company pays them directly for you.",
        hindi: "आपको अस्पताल में भुगतान करने की आवश्यकता नहीं है। बीमा कंपनी आपके लिए सीधे उन्हें भुगतान करती है।"
    },
    subsidized: {
        term: "Subsidized",
        simple: "The government pays a part of your bill, so you pay very little.",
        hindi: "सरकार आपके बिल का एक हिस्सा भुगतान करती है, इसलिए आप बहुत कम भुगतान करते हैं।"
    },
    claim: {
        term: "Claim",
        simple: "Asking the company for the money promised to you after a loss.",
        hindi: "नुकसान के बाद कंपनी से आपसे वादा किया गया पैसा मांगना।"
    },
    sum_insured: {
        term: "Sum Insured",
        simple: "The maximum value of protection for your life or property.",
        hindi: "आपके जीवन या संपत्ति के लिए सुरक्षा का अधिकतम मूल्य।"
    }
};

const JargonHelper = ({ termKey, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const isHindi = i18n.language === 'hi';

    const info = JARGON_DICTIONARY[termKey.toLowerCase()] || {
        term: termKey,
        simple: "Simple explanation coming soon.",
        hindi: "सरल व्याख्या जल्द ही आ रही है।"
    };

    return (
        <div className="relative inline-flex items-center group">
            {children}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="ml-1 text-blue-500 hover:text-blue-700 transition-colors p-0.5 rounded-full hover:bg-blue-50"
                title={`What is ${info.term}?`}
            >
                <HelpCircle size={14} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[1100]"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-[1101] bg-slate-900 text-white p-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-xs uppercase tracking-widest text-blue-400">
                                Simple Guide: {info.term}
                            </h4>
                            <button onClick={() => setIsOpen(false)}>
                                <X size={14} className="text-slate-500 hover:text-white" />
                            </button>
                        </div>
                        <p className="text-sm font-medium leading-relaxed">
                            {isHindi ? info.hindi : info.simple}
                        </p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                    </div>
                </>
            )}
        </div>
    );
};

export default JargonHelper;
