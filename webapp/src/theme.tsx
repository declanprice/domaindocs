import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: `'Poppins', sans-serif` },
                body: { value: `'Poppins', sans-serif` },
            },
            colors: {
                lightgray: { value: '#F7F8F9' },
                border: { value: '#E8E8E8' },
                hover: { value: '#F7F8F9' },
            },
        },
    },
});

// export const theme = extendTheme({
// components: {
//     Text: {
//         baseStyle: {
//             fontWeight: '300',
//             fontSize: 12,
//             color: 'gray.900',
//         },
//     },
//     Button: {
//         variants: {
//             solid: {
//                 backgroundColor: 'lightgray',
//             },
//         },
//         defaultProps: {
//             size: 'sm',
//         },
//     },
//     Input: {
//         variants: {
//             filled: {
//                 field: {
//                     backgroundColor: 'lightgray',
//                 },
//             },
//         },
//         defaultProps: {
//             size: 'sm',
//             variant: 'filled',
//         },
//     },
//     Textarea: {
//         variants: {
//             filled: {
//                 backgroundColor: 'lightgray',
//             },
//         },
//         defaultProps: {
//             size: 'sm',
//             variant: 'filled',
//         },
//     },
// },
// });
