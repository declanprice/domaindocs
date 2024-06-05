export const getFontSize = (size?: any) => {
    switch (size) {
        case 'xs':
            return 10;
        case 'sm':
            return 12;
        case 'md':
            return 14;
        default:
            return 12;
    }
};
