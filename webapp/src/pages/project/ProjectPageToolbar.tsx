import { Flex, Text } from '@chakra-ui/react';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';

type ProjectPageToolbarProps = {
    projectId: string;
    domainId: string;
    projectName: string;
};

export const ProjectPageToolbar = (props: ProjectPageToolbarProps) => {
    const { domainId, projectId, projectName } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <LiaProjectDiagramSolid color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Project | {projectName}
                    </Text>
                </Flex>
            }
            tabs={[
                {
                    label: 'Overview',
                    isActive: location.pathname.includes(`/${domainId}/projects/${projectId}/overview`),
                    onClick: () => {
                        navigate(`/${domainId}/projects/${projectId}/overview`);
                    },
                },
                {
                    label: 'Docs',
                    isActive: location.pathname.includes(`/${domainId}/projects/${projectId}/docs`),
                    onClick: () => {
                        navigate(`/${domainId}/projects/${projectId}/docs`);
                    },
                },
            ]}
        />
    );
};
