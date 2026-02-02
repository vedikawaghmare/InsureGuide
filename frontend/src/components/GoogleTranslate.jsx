import { useEffect, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

function GoogleTranslate({ hidden = false }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const initializeGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                try {
                    // Check if already initialized to avoid duplicates
                    if (!document.querySelector('.goog-te-combo')) {
                        new window.google.translate.TranslateElement({
                            pageLanguage: 'en',
                            includedLanguages: 'en,hi,mr,gu,ta,te,bn,kn',
                            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                            autoDisplay: false
                        }, 'google_translate_element');
                    }
                    setIsLoaded(true);
                } catch (error) {
                    console.error('Google Translate initialization error:', error);
                }
            } else {
                setTimeout(initializeGoogleTranslate, 500);
            }
        };

        const timer = setTimeout(initializeGoogleTranslate, 500);
        return () => clearTimeout(timer);
    }, []);

    if (hidden) {
        return <div id="google_translate_element" className="hidden h-0 w-0 overflow-hidden"></div>;
    }

    if (!isVisible) return null;

    return (
        <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-gray-100 px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200">
            <Globe size={16} className="text-gray-600" />
            <div id="google_translate_element" className="translate-widget"></div>
            {!isLoaded && (
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                    <span>English</span>
                    <ChevronDown size={14} />
                </div>
            )}
            <button
                onClick={() => setIsVisible(false)}
                className="ml-2 text-gray-400 hover:text-gray-600 text-xs"
                title="Hide translator"
            >
                ×
            </button>
        </div>
    );
}

export default GoogleTranslate;