import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown({ onAfterChange }) {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिंदी" },
        { code: "te", label: "తెలుగు" },
        { code: "ta", label: "தமிழ்" },
        { code: "bn", label: "বাংলা" },
        { code: "gu", label: "ગુજરાતી" },
        { code: "kn", label: "ಕನ್ನಡ" },
        { code: "mr", label: "मराठी" },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem("selectedLanguage", code);
        setOpen(false);
        onAfterChange?.(code);
    };

    const currentLang =
        languages.find((l) => l.code === i18n.language)?.label || "English";

    return (
        <div ref={dropdownRef} style={styles.wrapper}>
            <button
                onClick={() => setOpen(!open)}
                style={styles.button}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                🌐 {currentLang}
                <span style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▾
                </span>
            </button>

            {open && (
                <div style={styles.dropdown}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            style={{
                                ...styles.option,
                                background:
                                    i18n.language === lang.code ? "#f0f0f0" : "transparent",
                            }}
                        >
                            <span>{lang.label}</span>
                            {i18n.language === lang.code && <span>✔</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    wrapper: {
        position: "relative",
        width: "fit-content",
    }
    ,
    button: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
    },
    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,               // 🔥 anchor to button
        marginTop: 8,
        width: "100%",         // 🔥 same width as button
        maxHeight: 260,        // 🔥 prevents overflow
        overflowY: "auto",     // 🔥 scroll if many languages
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        padding: 6,
        zIndex: 200,
    },
    option: {
        width: "100%",
        padding: "10px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 14,
        borderRadius: 6,
    },
};
