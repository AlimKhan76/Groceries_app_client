/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
    "./screens/**.{jsx,js,ts,tsx}",
    "./screens/UserScreens/**.{jsx,js}",
    "./screens/AdminScreens/**.{jsx,js}",
    "./screens/components/**.{jsx,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mulish-regular': ['Mulish-Regular'],
        'mulish-medium': ['Mulish-Medium'],
        'mulish-semibold': ['Mulish-SemiBold'],
        'mulish-bold': ['Mulish-Bold'],
        'mulish-extrabold': ['Mulish-ExtraBold'],
        'mulish-black': ['Mulish-Black'],
      }
    },
  },
  plugins: [],
}

