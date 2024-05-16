import { PageToolbar } from '../../components/page/PageToolbar';
import { Flex, Text } from '@chakra-ui/react';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { Person } from '@domaindocs/lib';

type PersonPageToolbarProps = {
    person: Person;
};
export const PersonPageToolbar = (props: PersonPageToolbarProps) => {
    const { person } = props;

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <LiaProjectDiagramSolid color={'gray.900'} size={18} />
                    <Text ml={2} fontSize={12}>
                        Person | {person.firstName} {person.lastName}
                    </Text>
                </Flex>
            }
        />
    );
};
