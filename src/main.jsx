import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.jsx';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#E6F2FF',
      200: '#B3D9FF',
      300: '#80BFFF',
      400: '#4DA6FF',
      500: '#1A8CFF',
      600: '#0066CC',
      700: '#004C99',
      800: '#003366',
      900: '#001933',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Open Sans, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);