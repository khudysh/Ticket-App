// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#353535',
    surface: '#353535',
    primary: '#3f51b5',
    secondary: '#03dac6',
    error: '#f44336',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
}
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,myCustomDarkTheme
    }
  }
})
