module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Inter"',
        'ui-sans-serif',
        'system-ui',
        ' -apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      // pixel: ['NeueBit', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      normal: 300,
      semibold: 600,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      brand: '#096796',
      text: '#000000',
      gray: '#515b6b',
      muted: '#d7d7d7',
      success: '#32d296',
      warning: '#faa05a',
      danger: '#f0506e',
      white: '#ffffff',
      primary: '#24202B',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
    },
    extend: {},
  },
  plugins: [

  ],
};
