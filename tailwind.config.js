/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      maxWidth: {
        '7xl': '70rem', 
        '8xl': '80rem', 
        '9xl': '90rem', 
        '10xl': '100rem', 
        '11xl': '110rem',
        '12xl': '120rem',
        '13xl': '130rem',
        '14xl': '140rem',
        '15xl': '150rem',
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        '3xs': '0.5rem', // 8px
      },
      colors: {
        'my-dark': '#2e4448',
        'my-teal': '#50b6a8',
        'my-teal-dark': '#429b8f',
        'my-lightteal': '#79cdbc',
        'my-peach': '#fec6a4',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
  "tailwind-class-sorter.classRegex": {
    "rescript": [
      "className\\w*?=\\w*(\"[\\s\\S]+?\")|className\\w*?=\\w*?\\{([\\s\\S]+?)\\}",
      "\"(.+?)\""
    ]
  }
}

