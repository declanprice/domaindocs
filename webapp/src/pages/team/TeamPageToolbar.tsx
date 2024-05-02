import { Flex, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';
import { TbUsersGroup } from 'react-icons/tb';

type TeamPageToolbarProps = {
    domainId: string;
    teamId: string;
    teamName: string;
};

export const TeamPageToolbar = (props: TeamPageToolbarProps) => {
    const { domainId, teamId, teamName } = props;

    const navigate = useNavigate();

    return (
        <>
            <PageToolbar
                title={
                    <Flex alignItems={'center'}>
                        <TbUsersGroup color={'gray.900'} size={14} />
                        <Text ml={2} fontSize={12}>
                            Teams | {teamName}
                        </Text>
                    </Flex>
                }
                tabs={[
                    {
                        label: 'Overview',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/overview`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/overview`);
                        },
                    },
                    {
                        label: 'Members',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/members`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/members`);
                        },
                    },
                    {
                        label: 'Projects',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/projects`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/projects`);
                        },
                    },
                    {
                        label: 'Documentation',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/documentation`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/documentation`);
                        },
                    },
                ]}
            />
        </>
    );
};
