import { Button, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { MdOutlineAttachFile } from 'react-icons/md';
import { UploadFile } from '../../../../../components/file/UploadFile';
import { AddItemAttachmentData, DetailedWorkItem } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { workApi } from '../../../../../state/api/workApi';
import React from 'react';
import { AddIconButton } from '../../../../../components/buttons/AddIconButton';
import { BiDotsHorizontal } from 'react-icons/bi';
import { TbDelta, TbDots, TbHttpDelete, TbTrash } from 'react-icons/tb';
import { FiDelete } from 'react-icons/fi';

type ItemAttachmentsProps = {
    domainId: string;
    areaId: string;
    item: DetailedWorkItem;
};

export const ItemAttachments = (props: ItemAttachmentsProps) => {
    const { domainId, areaId, item } = props;

    const { mutateAsync, isPending: isAttaching } = useMutation<void, any, AddItemAttachmentData>({
        mutationFn: (data: AddItemAttachmentData) => workApi().addItemAttachment(domainId, areaId, item.id, data),
    });

    const { mutateAsync: removeAttachment, isPending: isRemoving } = useMutation<void, any, string>({
        mutationFn: (fileId: string) => workApi().removeAttachment(domainId, areaId, item.id, fileId),
    });

    return (
        <Flex direction={'column'} gap={2} py={2}>
            <Flex>
                <Text fontSize={16}>Attachments</Text>

                <Flex marginLeft={'auto'} gap={2} alignItems="center">
                    <UploadFile
                        domainId={domainId}
                        name={'attachments-list'}
                        onUpload={async (file) => {
                            await mutateAsync({
                                fileId: file.fileId,
                            });
                        }}
                    >
                        {({ openUploader, isUploading }) => (
                            <AddIconButton
                                alignItems={'center'}
                                variant={'ghost'}
                                fontWeight={'normal'}
                                onClick={openUploader}
                                isLoading={isUploading || isAttaching}
                            >
                                Attach
                            </AddIconButton>
                        )}
                    </UploadFile>

                    <IconButton size={'sm'} variant={'ghost'} aria-label={'attachments-menu'} icon={<TbDots />} />
                </Flex>
            </Flex>

            <List spacing={1}>
                {item.attachments.map((attachment) => (
                    <ListItem
                        rounded={4}
                        p={2}
                        key={attachment.fileId}
                        display={'flex'}
                        alignItems={'center'}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Text fontSize={12}>{attachment.name}</Text>

                        <IconButton
                            ml={'auto'}
                            variant={'ghost'}
                            aria-label={'remove-attachment'}
                            size={'sm'}
                            icon={<TbTrash />}
                            isLoading={isRemoving}
                            onClick={async () => {
                                await removeAttachment(attachment.fileId);
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};

export const ItemAttachmentButton = (props: ItemAttachmentsProps) => {
    const { domainId, areaId, item } = props;

    const { mutateAsync, isPending: isAttaching } = useMutation<void, any, AddItemAttachmentData>({
        mutationFn: (data: AddItemAttachmentData) => workApi().addItemAttachment(domainId, areaId, item.id, data),
    });

    return (
        <UploadFile
            domainId={domainId}
            name={'attachment-button'}
            onUpload={async (file) => {
                await mutateAsync({
                    fileId: file.fileId,
                });
            }}
        >
            {({ openUploader, isUploading }) => (
                <Button
                    alignItems={'center'}
                    size={'sm'}
                    leftIcon={<MdOutlineAttachFile />}
                    variant={'ghost'}
                    fontWeight={'normal'}
                    onClick={openUploader}
                    isLoading={isUploading || isAttaching}
                >
                    Attach
                </Button>
            )}
        </UploadFile>
    );
};
