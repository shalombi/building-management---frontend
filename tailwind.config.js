/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
        require('@tailwindcss/forms'),
  ],
}

  // tailwind.config.js
  // module.exports = {
  //   // ...
  //   plugins: [
  //     // ...
  //   ],
  // }
  // ```
// tailwind.config.js
// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   // ...
// }