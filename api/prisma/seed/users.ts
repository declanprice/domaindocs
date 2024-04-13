import { User } from '@prisma/client';

export const declanUser = (): User => {
  return {
    userId: '83a59c9c-c16d-45ed-9cc9-0a70d83f2928',
    firstName: 'Declan',
    lastName: 'Price',
    fullName: 'Declan Price',
    email: 'aws.declanprice@gmail.com',
    iconUri: undefined,
  };
};

export const benUser = (): User => {
  return {
    userId: 'ben',
    firstName: 'Ben',
    lastName: 'Munroe',
    email: 'aws.ben@gmail.com',
    fullName: 'Ben Munroe',
    iconUri: undefined,
  };
};

export const natashaUser = (): User => {
  return {
    userId: 'natasha',
    firstName: 'Natasha',
    lastName: 'Leslie',
    email: 'aws.natasha@gmail.com',
    fullName: 'Natasha Leslie',
    iconUri: undefined,
  };
};
