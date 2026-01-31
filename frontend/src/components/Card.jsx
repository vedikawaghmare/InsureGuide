function Card({ children, className = "", variant = "default", ...props }) {
    const variants = {
        default: "bg-white border border-gray-200",
        green: "bg-green-50 border border-green-200",
        blue: "bg-blue-50 border border-blue-200",
        gray: "bg-gray-100 border border-gray-200",
    };

    return (
        <div
            {...props}   // ✅ THIS IS THE KEY FIX
            className={`rounded-xl p-4 shadow-sm ${variants[variant]} ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
