import { PageToolbar } from '../../components/page/PageToolbar';
import { Flex, Link, Text } from '@chakra-ui/react';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { Person } from '@domaindocs/lib';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePerson } from 'react-icons/md';

type PersonPageToolbarProps = {
    domainId: string;
    person: Person;
};

export const PersonPageToolbar = (props: PersonPageToolbarProps) => {
    const { domainId, person } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <MdOutlinePerson color={'gray.900'} size={18} />
                    <Text ml={2} fontSize={12}>
                        <Link
                            href={undefined}
                            onClick={() => {
                                navigate(`/${domainId}/people`);
                            }}
                        >
                            People
                        </Link>{' '}
                        | {person.firstName} {person.lastName}
                    </Text>
                </Flex>
            }
        />
    );
};
