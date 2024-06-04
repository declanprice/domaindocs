export const getFontSize = (size?: any) => {
    switch (size) {
        case 'xs':
            return 12;
        case 'sm':
            return 14;
        case 'md':
            return 16;
        default:
            return 14;
    }
};
