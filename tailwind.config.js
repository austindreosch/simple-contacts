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
        '9xl': '90rem', 
        '10xl': '100rem', 
      }
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

