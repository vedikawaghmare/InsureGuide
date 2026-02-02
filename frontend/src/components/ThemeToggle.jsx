import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = "" }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 active:scale-95 ${theme === 'dark'
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 shadow-inner'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200'
                } ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
