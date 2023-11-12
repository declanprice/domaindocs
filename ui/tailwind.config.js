/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {},
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')]
}
