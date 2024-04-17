import { User } from '@prisma/client';

export const declanUser = (): User => {
  return {
    userId: '42467cee-fa18-4ad6-bd35-9ef399e80794',
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
