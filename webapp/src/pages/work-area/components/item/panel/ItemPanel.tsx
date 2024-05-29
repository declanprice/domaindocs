import { Divider, Flex, Text } from '@chakra-ui/react';
import { DetailedWorkItem, WorkItemType } from '@domaindocs/types';
import { ItemAssignees } from './ItemAssignees';
import { ItemReportedBy } from './ItemReportedBy';
import { ItemDescription } from './ItemDescription';
import { ItemTypeMenu } from './ItemTypeMenu';
import { ItemAttachmentButton, ItemAttachments } from './ItemAttachments';
import { ItemParentMenu } from './ItemParentMenu';

type ItemPanelProps = {
    item: DetailedWorkItem;
    domainId: string;
    areaId: string;
};

export const ItemPanel = (props: ItemPanelProps) => {
    const { item, domainId, areaId } = props;

    return (
        <Flex direction="column" gap={2}>
            <Flex direction={'column'} gap={2}>
                <Text fontSize={24}>{item.name}</Text>

                <Flex gap={2} alignItems={'center'}>
                    {item.type !== WorkItemType.EPIC && (
                        <>
                            <ItemParentMenu domainId={domainId} areaId={areaId} item={item} />

                            <Divider orientation={'vertical'} height={'20px'} />
                        </>
                    )}

                    <ItemTypeMenu domainId={domainId} areaId={areaId} item={item} />

                    <Divider orientation={'vertical'} height={'20px'} />

                    <ItemAttachmentButton domainId={domainId} areaId={areaId} item={item} />
                </Flex>
            </Flex>

            <Divider />

            <Flex direction={'column'} gap={2} py={2} maxWidth={'500px'}>
                <Text fontSize={16}>Details</Text>

                <Flex gap={2} direction={'column'}>
                    <Flex gap={4} alignItems={'center'}>
                        <Text fontSize={12} flex={1}>
                            Reported by
                        </Text>

                        <ItemReportedBy domainId={domainId} areaId={areaId} item={item} />
                    </Flex>

                    <Flex gap={4} alignItems={'center'}>
                        <Text fontSize={12} flex={1}>
                            Assigned to
                        </Text>

                        <ItemAssignees domainId={domainId} areaId={areaId} item={item} />
                    </Flex>
                </Flex>
            </Flex>

            <Divider />

            <ItemDescription domainId={domainId} areaId={areaId} item={item} />

            <Divider />

            <ItemAttachments domainId={domainId} areaId={areaId} item={item} />
        </Flex>
    );
};
