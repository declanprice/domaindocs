import { DetailedWorkItem, UpdateItemReportedByData, WorkAreaPerson } from '@domaindocs/types';
import { Flex, Menu, MenuCheckboxItem, MenuContent, MenuItemGroup, MenuTrigger, Text } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { workApi } from '../../../../../state/api/workApi';
import { LoadingContainer } from '../../../../../components/loading/LoadingContainer';
import { Avatar, AvatarGroup } from '../../../../../components/ui/avatar';

type ItemReportedByProps = {
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemReportedBy = (props: ItemReportedByProps) => {
    const { domainId, areaId, item } = props;

    const { data: people, refetch: searchPeople } = useQuery<WorkAreaPerson[]>({
        enabled: false,
        queryKey: ['searchAreaPeople', { areaId }],
        queryFn: () => workApi().searchAreaPeople(domainId, areaId),
    });

    const { mutateAsync: updateReportedBy } = useMutation<void, any, UpdateItemReportedByData>({
        mutationKey: ['updateReportedBy', { item: item.id }],
        mutationFn: (data) => workApi().updateReportedBy(domainId, areaId, item.id, data),
    });

    const reportedBy = item.reportedBy;

    return (
        <Menu.Root closeOnSelect={false}>
            <MenuTrigger
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
                <Flex alignItems={'center'} gap={2} flex={1}>
                    <AvatarGroup>
                        <Avatar
                            name={`${reportedBy.firstName} ${reportedBy.lastName}`}
                            src={reportedBy.iconUri}
                            size={'xs'}
                        />
                    </AvatarGroup>

                    <Text fontSize={12}>
                        {reportedBy.firstName} {reportedBy.lastName}
                    </Text>
                </Flex>
            </MenuTrigger>

            <MenuContent>
                {!people ? (
                    <LoadingContainer />
                ) : (
                    <MenuItemGroup
                        title="Select reporter"
                        type="radio"
                        value={item.reportedBy.userId}
                        onChange={async (userId: string) => {
                            await updateReportedBy({
                                userId,
                            });
                        }}
                    >
                        {people.map((p) => (
                            <MenuCheckboxItem key={p.userId} value={p.userId}>
                                <Flex gap={2}>
                                    <Avatar name={`${p.firstName} ${p.lastName}`} src={p.iconUri} size={'xs'} />
                                    <Text fontSize={12}>
                                        {p.firstName} {p.lastName}
                                    </Text>
                                </Flex>
                            </MenuCheckboxItem>
                        ))}
                    </MenuItemGroup>
                )}
            </MenuContent>
        </Menu.Root>
    );
};
