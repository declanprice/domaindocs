const linuxUser = 'd421ee8e-26c3-4398-8456-b9b372267d90';
const macUser = 'e6ba44aa-bfa7-45c9-963e-ed867e422f9b';

import { User } from '@prisma/client';

export const declanUser = (): User => {
    return {
        userId: linuxUser,
        firstName: 'Declan',
        lastName: 'Price',
        fullName: 'Declan Price',
        email: 'aws.declanprice@gmail.com',
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
