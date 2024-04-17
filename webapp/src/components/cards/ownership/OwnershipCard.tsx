import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Avatar,
  Box,
} from '@chakra-ui/react';

export type Ownership = {
  teamId: string;
  teamName: string;
  iconUri?: string;
};

type OwnershipCardProps = {
  ownership: Ownership;
};

export const OwnershipCard = (props: OwnershipCardProps) => {
  const { ownership } = props;

  return (
    <Card boxShadow="xs">
      <CardHeader pb={0} fontSize={16}>
        <Flex>
          <Text flex={1}>Ownership</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex alignItems="center" width={'100%'}>
          <Avatar
            size={'xs'}
            src={ownership.iconUri}
            name={`${ownership.teamName}`}
          />

          <Box ml="3">
            <Text fontWeight="regular" fontSize={14}>
              {ownership.teamName}
            </Text>

            <Text fontWeight="regular" fontSize={12}>
              Full Team
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
