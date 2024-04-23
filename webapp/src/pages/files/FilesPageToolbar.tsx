import { Flex, Text } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';

type FilesPageToolbarProps = {
    domainId: string;
};

export const FilesPageToolbar = (props: FilesPageToolbarProps) => {
    const { domainId } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <TbUsersGroup color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Files
                    </Text>
                </Flex>
            }
            tabs={[
                {
                    label: 'Relevant',
                    isActive: location.pathname.includes(`/${domainId}/files/relevant`),
                    onClick: () => {
                        navigate(`/${domainId}/files/relevant`);
                    },
                },
                {
                    label: 'All',
                    isActive: location.pathname.includes(`/${domainId}/files/all`),
                    onClick: () => {
                        navigate(`/${domainId}/files/all`);
                    },
                },
            ]}
            actions={[
                {
                    label: 'Upload',
                    onClick: () => {},
                },
            ]}
        />
    );
};
