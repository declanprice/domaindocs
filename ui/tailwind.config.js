/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {},
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')]
}
