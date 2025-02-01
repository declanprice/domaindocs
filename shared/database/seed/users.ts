const declanUserId = '0e584fd1-424b-4e26-a5ad-dfc8266e3569';

import { User } from '@prisma/client';

export const declanUser = (): User => {
    return {
        userId: declanUserId,
        firstName: 'Declan',
        lastName: 'Price',
        fullName: 'Declan Price',
        email: 'declaprice1@gmail.com',
        iconUri: null,
    };
};

export const benUser = (): User => {
    return {
        userId: 'ben',
        firstName: 'Ben',
        lastName: 'Munroe',
        email: 'aws.ben@gmail.com',
        fullName: 'Ben Munroe',
        iconUri: null,
    };
};

export const natashaUser = (): User => {
    return {
        userId: 'natasha',
        firstName: 'Natasha',
        lastName: 'Leslie',
        email: 'aws.natasha@gmail.com',
        fullName: 'Natasha Leslie',
        iconUri: null,
    };
};
