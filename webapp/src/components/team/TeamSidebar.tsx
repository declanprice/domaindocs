import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react';
import { DetailedTeamDto } from '@domaindocs/lib';

type TeamSidebar = {
  isOpen: boolean;
  onClose: () => void;
  team: DetailedTeamDto | null;
};

export const TeamSidebar = (props: TeamSidebar) => {
  const { isOpen, onClose, team } = props;

  if (!team) return null;

  return (
    <Drawer size={'lg'} isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex alignItems={'center'}>
            <Avatar src={team.team.iconUri} name={team.team.name} />

            <Flex ml={4} direction={'column'} justifyContent={'center'}>
              <Text fontSize={14}>{team.team.name}</Text>
              <Text fontSize={12}>{team.members.length} Members</Text>
            </Flex>
          </Flex>
        </DrawerHeader>

        <DrawerBody backgroundColor={'gray.100'}>team</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
