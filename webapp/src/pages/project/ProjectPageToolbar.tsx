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
    <>
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
            isActive: location.pathname.includes(
              `/${domainId}/projects/${projectId}/overview`,
            ),
            onClick: () => {
              navigate(`/${domainId}/projects/${projectId}/overview`);
            },
          },
          {
            label: 'Documentation',
            isActive: location.pathname.includes(
              `/${domainId}/projects/${projectId}/documentation`,
            ),
            onClick: () => {
              navigate(`/${domainId}/projects/${projectId}/documentation`);
            },
          },
          {
            label: 'Files',
            isActive: location.pathname.includes(
              `/${domainId}/projects/${projectId}/files`,
            ),
            onClick: () => {
              navigate(`/${domainId}/projects/${projectId}/files`);
            },
          },
          {
            label: 'Secrets',
            isActive: location.pathname.includes(
              `/${domainId}/projects/${projectId}/secrets`,
            ),
            onClick: () => {
              navigate(`/${domainId}/projects/${projectId}/secrets`);
            },
          },
        ]}
      />
    </>
  );
};
