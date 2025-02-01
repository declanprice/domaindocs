import { Person, User } from '@prisma/client';
import { v4 } from 'uuid';

export const generatePeople = (domainId: string, count: number): { user: User; person: Person }[] => {
    const people: { user: User; person: Person }[] = [];

    for (let index = 0; index < count; index++) {
        const userId = v4();

        people.push({
            user: {
                userId,
                firstName: `user-${index}`,
                lastName: 'lastname',
                email: `user${index}@gmail.com`,
                fullName: `user-${index} lastname`,
                iconUri: '',
            },
            person: {
                userId,
                domainId,
                aboutMe: '',
                dateJoined: new Date(),
            },
        });
    }

    return people;
};
