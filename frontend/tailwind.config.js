/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cool-grey': '#f0f3f7',
                'brand-bg': '#f0f3f7', // Alias for easier future changes
            }
        },
    },
    plugins: [],
};
