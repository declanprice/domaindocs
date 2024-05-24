import { Flex, Heading, Text } from '@chakra-ui/react';

type OnboardingGuideNoteStepProps = {
    name: string;
    note: string;
};

export const OnboardingGuideNoteStep = (props: OnboardingGuideNoteStepProps) => {
    const { name, note } = props;

    return (
        <Flex width="100%" flexDirection="column">
            <Flex py={8} px={2} gap={4} flexDirection={'column'} alignItems={'center'}>
                <Flex maxWidth={'900px'} width={'100%'}>
                    <Heading variant={'h2'} fontWeight={'bold'}>
                        {name}
                    </Heading>
                </Flex>

                <Flex maxWidth={'900px'} width={'100%'}>
                    <Text>{note}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
