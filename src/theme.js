import { extendTheme } from '@chakra-ui/react';

const colors = {
    primary: {
        50: '#f0e6f6',
        100: '#d1c0e5',
        200: '#b197d3',
        300: '#916ec1',
        400: '#7a4fb3',
        500: '#6a4c93',
        600: '#5a3e7d',
        700: '#4a3067',
        800: '#3a2251',
        900: '#2a143b'
    },
    secondary: {
        50: '#e6f6f8',
        100: '#c0e6ec',
        200: '#97d5e0',
        300: '#6ec4d4',
        400: '#50b7ca',
        500: '#8ac6d1',
        600: '#3a9eb1',
        700: '#2a7f91',
        800: '#1a6071',
        900: '#0a4151'
    },
    accent: {
        50: '#fff4e0',
        100: '#ffe4b3',
        200: '#ffd480',
        300: '#ffc44d',
        400: '#ffb526',
        500: '#ffa62b',
        600: '#e68a00',
        700: '#b36d00',
        800: '#805000',
        900: '#4d3300'
    },
    background: {
        50: '#ffffff',
        100: '#f9fcfb',
        200: '#f0f7f4',
        300: '#e6f2ed',
        400: '#ddeee6',
        500: '#d3e9df',
        600: '#b9d9c9',
        700: '#9fc9b3',
        800: '#85b99d',
        900: '#6ba987'
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
                bg: props.colorScheme === 'primary' ? 'primary.500' : 'secondary.500',
                color: 'white',
                _hover: {
                    bg: props.colorScheme === 'primary' ? 'primary.600' : 'secondary.600'
                }
            }),
            outline: (props) => ({
                border: '2px solid',
                borderColor: props.colorScheme === 'primary' ? 'primary.500' : 'secondary.500',
                color: props.colorScheme === 'primary' ? 'primary.500' : 'secondary.500'
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
    config,
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'gray.800' : 'background.200',
                color: props.colorMode === 'dark' ? 'white' : 'gray.800'
            }
        })
    }
});

export default theme;
