import { Flex, Text } from '@chakra-ui/react';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';

type DocumentationToolbarProps = {
  domainId: string;
};

export const DocumentationToolbar = (props: DocumentationToolbarProps) => {
  const { domainId } = props;

  const navigate = useNavigate();

  return (
    <>
      <PageToolbar
        title={
          <Flex alignItems={'center'}>
            <LiaProjectDiagramSolid color={'gray.900'} size={14} />
            <Text ml={2} fontSize={12}>
              Documentation
            </Text>
          </Flex>
        }
        tabs={[
          {
            label: 'Relevant to me',
            isActive: location.pathname.includes(
              `/${domainId}/documentation/relevant`,
            ),
            onClick: () => {
              navigate(`/${domainId}/documentation/relevant`);
            },
          },
          {
            label: 'All',
            isActive: location.pathname.includes(
              `/${domainId}/documentation/all`,
            ),
            onClick: () => {
              navigate(`/${domainId}/documentation/all`);
            },
          },
        ]}
      />
    </>
  );
};
