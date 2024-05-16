import { projectLink } from '../src';
import { v4 } from 'uuid';

export const projectLinks = (projectId: string): (typeof projectLink.$inferInsert)[] => {
    return [
        {
            linkId: v4(),
            projectId,
            title: 'Grafana',
            subTitle: 'Go to dashboard',
            href: 'https://github.com/grafana',
            iconUri: '',
        },
        {
            linkId: v4(),
            projectId,
            title: 'Github',
            subTitle: 'Go to code',
            href: 'https://github.com/grafana',
            iconUri: '',
        },
    ];
};
