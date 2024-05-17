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
                        label: 'Docs',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/docs`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/docs`);
                        },
                    },
                    {
                        label: 'Settings',
                        isActive: location.pathname.includes(`/${domainId}/teams/${teamId}/settings`),
                        onClick: () => {
                            navigate(`/${domainId}/teams/${teamId}/settings`);
                        },
                    },
                ]}
            />
        </>
    );
};
