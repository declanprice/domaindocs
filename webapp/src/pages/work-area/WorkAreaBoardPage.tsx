import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { WorkAreaPageParams } from './WorkAreaPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedWorkBoard } from '@domaindocs/types';
import { workApi } from '../../state/api/workApi';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { WorkAreaPageToolbar } from './WorkAreaPageToolbar';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { FcStumbleupon } from 'react-icons/fc';

export const WorkAreaBoardPage = () => {
    const { domainId, areaId } = useParams() as WorkAreaPageParams;

    const { data: board, isLoading: isBoardLoading } = useQuery<DetailedWorkBoard>({
        queryKey: ['getWorkBoard', { domainId, areaId }],
        queryFn: () => workApi().getWorkBoard(),
    });

    if (!board || isBoardLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <WorkAreaPageToolbar domainId={domainId} area={board.area} />

            <Flex height={'100%'} width={'100%'} overflowY={'auto'} direction={'column'} p={4}>
                <Flex alignItems={'center'} borderBottom={'1px'} borderColor={'border'} pb={4}>
                    <InputGroup size={'sm'} maxWidth={'300px'}>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch color="gray.900" />
                        </InputLeftElement>
                        <Input variant={'filled'} placeholder="Search board" backgroundColor={'lightgray'} />
                    </InputGroup>
                </Flex>

                <Flex mt={4} gap={4}>
                    {board.columns.map((column) => (
                        <Flex
                            direction={'column'}
                            gap={2}
                            rounded={4}
                            minHeight={'300px'}
                            minWidth={'250px'}
                            backgroundColor={'lightgray'}
                            p={1}
                        >
                            <Flex p={2}>
                                <Text fontSize={12} color={'gray.900'} display={'flex'}>
                                    {column.name} {column.items.length}
                                </Text>
                            </Flex>

                            <Flex mt={2} direction={'column'} gap={2}>
                                {column.items.map((column) => (
                                    <Box
                                        border={'1px solid'}
                                        borderColor={'border'}
                                        _hover={{
                                            backgroundColor: 'gray.100',
                                            cursor: 'pointer',
                                        }}
                                        rounded={4}
                                        minHeight={'80px'}
                                        height={'80px'}
                                        maxHeight={'80px'}
                                        backgroundColor={'white'}
                                    ></Box>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
