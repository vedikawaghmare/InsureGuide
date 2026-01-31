import { useEffect, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

function GoogleTranslate() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                try {
                    window.googleTranslateElementInit();
                    setIsLoaded(true);
                } catch (error) {
                    console.log('Google Translate initialization error:', error);
                }
            }
        };

        // Check immediately
        checkGoogleTranslate();
        
        // Check again after a delay
        const timer = setTimeout(checkGoogleTranslate, 1000);
        
        return () => clearTimeout(timer);
    }, []);

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
        </div>
    );
}

export default GoogleTranslate;