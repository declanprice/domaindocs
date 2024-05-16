import { Flex, Text } from '@chakra-ui/react';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';

type DocsPageToolbarProps = {
    domainId: string;
};

export const DocsPageToolbar = (props: DocsPageToolbarProps) => {
    const { domainId } = props;

    const navigate = useNavigate();

    return (
        <>
            <PageToolbar
                title={
                    <Flex alignItems={'center'}>
                        <LiaProjectDiagramSolid color={'gray.900'} size={14} />
                        <Text ml={2} fontSize={12}>
                            Docs
                        </Text>
                    </Flex>
                }
            />
        </>
    );
};
