import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    colors: {
        lightgray: '#F7F8F9',
        border: '#E8E8E8',
        hover: '#F1F0F0',
    },
    components: {
        Text: {
            baseStyle: {
                fontWeight: '300',
                fontSize: 12,
            },
        },
        Button: {
            variants: {
                solid: {
                    backgroundColor: 'lightgray',
                },
            },
            defaultProps: {
                size: 'sm',
            },
        },
        Input: {
            variants: {
                filled: {
                    field: {
                        backgroundColor: 'lightgray',
                    },
                },
            },
            defaultProps: {
                size: 'sm',
                variant: 'filled',
            },
        },
    },
});
