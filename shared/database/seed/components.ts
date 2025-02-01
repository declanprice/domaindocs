import { ros } from './domain';
import { v4 } from 'uuid';
import { teamOrion } from './teams';
import { Component, ComponentLink, ComponentContact } from '@prisma/client';
import { ComponentType, ContactType } from '../../types/src';

export const deedSearchComponent = (): Component => {
    return {
        componentId: 'deedsearch',
        type: ComponentType.SERVICE,
        ownerTeamId: teamOrion().teamId,
        subdomainId: null,
        domainId: ros().domainId,
        name: 'Deed Search',
        description: 'Deed search is a web service built to allow people within ROS to search for deeds.',
    };
};

export const componentLinks = (): ComponentLink[] => {
    return [
        {
            linkId: v4(),
            domainId: ros().domainId,
            componentId: deedSearchComponent().componentId,
            description: 'Grafana',
            href: 'https://github.com/grafana',
        },
        {
            linkId: v4(),
            domainId: ros().domainId,
            componentId: deedSearchComponent().componentId,
            description: 'Github',
            href: 'https://github.com/grafana',
        },
    ];
};

export const componentContacts = (): ComponentContact[] => {
    return [
        {
            contactId: v4(),
            componentId: deedSearchComponent().componentId,
            domainId: ros().domainId,
            type: ContactType.EMAIL,
            reason: '',
            description: 'declanprice1@gmail.com',
            href: null,
        },
        {
            contactId: v4(),
            componentId: deedSearchComponent().componentId,
            domainId: ros().domainId,
            type: ContactType.MOBILE,
            description: '0732564895',
            reason: '',
            href: null,
        },
        {
            contactId: v4(),
            componentId: deedSearchComponent().componentId,
            domainId: ros().domainId,
            type: ContactType.LINK,
            reason: '',
            href: 'https://google.com',
            description: 'Google',
        },
    ];
};
