import { UpdateItemAssigneesData, WorkAreaPerson, WorkItem } from '@domaindocs/types';
import {
    Avatar,
    AvatarGroup,
    Flex,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Text,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { workApi } from '../../../../../state/api/workApi';
import { LoadingContainer } from '../../../../../components/loading/LoadingContainer';

type ItemAssigneesProps = {
    domainId: string;
    areaId: string;
    item: WorkItem;
    iconOnly?: boolean;
};

export const ItemAssignees = (props: ItemAssigneesProps) => {
    const { domainId, areaId, item, iconOnly } = props;

    const { data: people, refetch: searchPeople } = useQuery<WorkAreaPerson[]>({
        enabled: false,
        queryKey: ['searchAreaPeople', { areaId }],
        queryFn: () => workApi().searchAreaPeople(domainId, areaId),
    });

    const { mutateAsync: updateAssignees } = useMutation<void, any, UpdateItemAssigneesData>({
        mutationKey: ['updateAssignees', { item: item.id }],
        mutationFn: (data) => workApi().updateItemAssignees(domainId, areaId, item.id, data),
    });

    const renderButton = () => {
        const assignees = item.assignees;

        if (assignees.length === 0) {
            return (
                <Flex alignItems={'center'} gap={2} flex={1}>
                    <Avatar
                        name={'Unassigned'}
                        src={
                            'https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'
                        }
                        size={'xs'}
                    />
                    {iconOnly !== true && <Text fontSize={12}> Unassigned </Text>}
                </Flex>
            );
        }

        if (assignees.length === 1) {
            const assignee = assignees[0];

            return (
                <Flex alignItems={'center'} gap={2} flex={1}>
                    <AvatarGroup max={3}>
                        {assignees.map((a) => (
                            <Avatar name={`${a.firstName} ${a.lastName}`} src={a.iconUri} size={'xs'} />
                        ))}
                    </AvatarGroup>

                    {iconOnly !== true && (
                        <Text fontSize={12}>
                            {assignee.firstName} {assignee.lastName}
                        </Text>
                    )}
                </Flex>
            );
        }

        return (
            <AvatarGroup max={3}>
                {assignees.map((a) => (
                    <Avatar name={`${a.firstName} ${a.lastName}`} src={a.iconUri} size={'xs'} />
                ))}
            </AvatarGroup>
        );
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                p={1}
                rounded={4}
                alignItems={'center'}
                gap={2}
                flex={1}
                onClick={() => {
                    if (!people) {
                        searchPeople().then();
                    }
                }}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            >
                {renderButton()}
            </MenuButton>

            <MenuList>
                {!people ? (
                    <LoadingContainer />
                ) : (
                    <MenuOptionGroup
                        title="Select assignees"
                        type="checkbox"
                        value={item.assignees.map((a) => a.userId)}
                        onChange={async (userIds) => {
                            if (Array.isArray(userIds)) {
                                await updateAssignees({
                                    userIds,
                                });
                            }
                        }}
                    >
                        {people.map((p) => (
                            <MenuItemOption key={p.userId} value={p.userId}>
                                <Flex gap={2}>
                                    <Avatar name={`${p.firstName} ${p.lastName}`} src={p.iconUri} size={'xs'} />
                                    <Text fontSize={12}>
                                        {p.firstName} {p.lastName}
                                    </Text>
                                </Flex>
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                )}
            </MenuList>
        </Menu>
    );
};
