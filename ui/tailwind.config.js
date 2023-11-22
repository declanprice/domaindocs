const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        },
        colors: {
            black: colors.black,
            gray: colors.gray,
            red: colors.red,
            primary: '#1F2633',
            secondary: '#364259',
            white: '#ffffff'
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif']
        }
    },
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')]
}
