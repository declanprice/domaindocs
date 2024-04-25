import { projectOwnership } from '../src';
import { v4 } from 'uuid';
import { teamOrion } from './teams';

export const teamOrionOwnership = (projectId: string): typeof projectOwnership.$inferInsert => {
    return {
        ownershipId: v4(),
        projectId,
        teamId: teamOrion().teamId,
        description: 'Full Project',
    };
};
