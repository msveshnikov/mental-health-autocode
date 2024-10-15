import { extendTheme } from '@chakra-ui/react';

const colors = {
    brand: {
        50: '#E6F5FF',
        100: '#B3E0FF',
        200: '#80CCFF',
        300: '#4DB8FF',
        400: '#1AA3FF',
        500: '#0080FF',
        600: '#0066CC',
        700: '#004D99',
        800: '#003366',
        900: '#001A33'
    },
    secondary: {
        50: '#FFF5E6',
        100: '#FFE0B3',
        200: '#FFCC80',
        300: '#FFB84D',
        400: '#FFA31A',
        500: '#FF8000',
        600: '#CC6600',
        700: '#994D00',
        800: '#663300',
        900: '#331A00'
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
