import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20'
  },
  secondary: {
    50: '#F1F8E9',
    100: '#DCEDC8',
    200: '#C5E1A5',
    300: '#AED581',
    400: '#9CCC65',
    500: '#8BC34A',
    600: '#7CB342',
    700: '#689F38',
    800: '#558B2F',
    900: '#33691E'
  }
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: '"Open Sans", sans-serif'
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'full'
    },
    variants: {
      solid: (props) => ({
        bg: props.colorScheme === 'brand' ? 'brand.500' : 'secondary.500',
        color: 'white',
        _hover: {
          bg: props.colorScheme === 'brand' ? 'brand.600' : 'secondary.600'
        }
      }),
      outline: (props) => ({
        border: '2px solid',
        borderColor: props.colorScheme === 'brand' ? 'brand.500' : 'secondary.500',
        color: props.colorScheme === 'brand' ? 'brand.500' : 'secondary.500'
      })
    }
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      letterSpacing: 'tight'
    }
  },
  Text: {
    baseStyle: {
      fontSize: 'md',
      lineHeight: 'tall'
    }
  }
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config
});

export default theme;