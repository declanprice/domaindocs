import { createBreakpoints } from '@solid-primitives/media'

const breakpoints = {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px'
}

export const matches = createBreakpoints(breakpoints)
