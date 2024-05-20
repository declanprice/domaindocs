import { Domain } from '@prisma/client';

export const ros = (): Domain => {
    return {
        domainId: 'registersofscotland',
        name: 'Registers Of Scotland',
    };
};
