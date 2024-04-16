import { Flex, Text } from '@chakra-ui/react';
import { GoPeople } from 'react-icons/go';
import { PageToolbar } from '../../components/page/PageToolbar';

export const PeoplePageToolbar = () => {
  return (
    <PageToolbar
      title={
        <Flex alignItems={'center'}>
          <GoPeople color={'gray.900'} size={14} />
          <Text ml={2} fontSize={12}>
            People
          </Text>
        </Flex>
      }
      actions={[
        {
          label: 'Invite',
          onClick: async () => {},
        },
      ]}
    />
  );
};
