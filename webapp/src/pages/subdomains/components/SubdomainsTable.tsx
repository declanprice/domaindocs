import { Subdomain } from '@domaindocs/types';
import { Flex, IconButton, Link, useDisclosure } from '@chakra-ui/react';
import { TbDots } from 'react-icons/tb';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { Table } from '../../../components/table/Table';
import { MenuTrigger, MenuContent, MenuRoot, MenuItem } from '../../../components/ui/menu';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';

type SubdomainsTableProps = {
    subdomains: Subdomain[];
    onClick: (subdomain: Subdomain) => void;
    onRemove: (subdomain: Subdomain) => Promise<void>;
};

export const SubdomainsTable = (props: SubdomainsTableProps) => {
    const { subdomains, onClick, onRemove } = props;

    return (
        <Table
            data={subdomains}
            fields={[
                {
                    label: 'Subdomain',
                    columnWidth: '20%',
                    render: (data: Subdomain) => {
                        return (
                            <Flex alignItems="center">
                                <Flex alignItems={'center'} backgroundColor={'green.600'} rounded={6} p={2}>
                                    <VscTypeHierarchySub color={'white'} size={18} />
                                </Flex>

                                <Link
                                    ml={4}
                                    textStyle={'sm'}
                                    whiteSpace={'nowrap'}
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                >
                                    {data.name}
                                </Link>
                            </Flex>
                        );
                    },
                    onClick: (row) => {
                        onClick(row);
                    },
                },
                {
                    headerAlign: 'end',
                    label: 'Actions',
                    render: (data: Subdomain) => {
                        return <SubdomainsActionsCell subdomain={data} onRemove={onRemove} />;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
            ]}
        />
    );
};

type SubdomainsActionsCellProps = {
    subdomain: Subdomain;
    onRemove: (subdomain: Subdomain) => Promise<void>;
};

export const SubdomainsActionsCell = (props: SubdomainsActionsCellProps) => {
    const removeSubdomainDialog = useDisclosure();

    return (
        <Flex>
            <MenuRoot>
                <MenuTrigger as={IconButton} ml={'auto'} aria-label={'teams-menu'} variant={'ghost'}>
                    <TbDots />
                </MenuTrigger>

                <MenuContent>
                    <MenuItem onClick={removeSubdomainDialog.onOpen}>Remove</MenuItem>
                </MenuContent>
            </MenuRoot>

            <ConfirmDialog
                header={'Remove subdomain'}
                body={'Are you sure you want to remove this subdomain?'}
                isOpen={removeSubdomainDialog.open}
                onConfirm={async () => {
                    await props.onRemove(props.subdomain);
                }}
                onCancel={removeSubdomainDialog.onClose}
            />
        </Flex>
    );
};
