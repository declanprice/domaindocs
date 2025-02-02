import { DetailedTeam, EditDescriptionData } from '@domaindocs/types';
import { Description } from '../../../components/description/Description';
import { useMutation } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';

type TeamDescriptionProps = {
    domainId: string;
    team: DetailedTeam;
};

export const TeamDescription = (props: TeamDescriptionProps) => {
    const { domainId, team } = props;

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDescriptionData>({
        mutationFn: (data) => teamsApi.updateDescription(domainId, team.team.teamId, data),
    });

    return (
        <Description
            placeholder={'Add a team description'}
            description={team.team.description}
            onUpdateDescription={updateDescription}
        />
    );
};
