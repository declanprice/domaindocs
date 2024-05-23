import { DetailedOnboardingGuide, OnboardingGuideProgressStatus } from '@domaindocs/lib';
import { Button, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react';

type OnboardingRecommendedList = {
    domainId: string;
    guides: DetailedOnboardingGuide[];
};

export const OnboardingRecommendedList = (props: OnboardingRecommendedList) => {
    const { guides, domainId } = props;

    const renderList = () => {
        const renderStatus = (guide: DetailedOnboardingGuide) => {
            if (guide.progress === null) {
                return <Text>Not Started</Text>;
            }

            if (guide.progress.status === OnboardingGuideProgressStatus.IN_PROGRESS) {
                return <Text>In Progress</Text>;
            }

            return <Text>Complete</Text>;
        };

        return (
            <List spacing={2}>
                {guides.map((guide: DetailedOnboardingGuide) => (
                    <ListItem fontSize={12} key={guide.guide.guideId} as={Button} variant={'ghost'} width={'100%'}>
                        <Flex alignItems={'center'} width={'100%'}>
                            <Text ml={2}>{guide.guide.name}</Text>
                            <Text ml={'auto'}>{guide.steps.length} Steps</Text>

                            <Divider orientation={'vertical'} height={'20px'} mx={2} />
                            {renderStatus(guide)}
                        </Flex>
                    </ListItem>
                ))}
            </List>
        );
    };

    const renderNoGuides = () => {
        return <Text fontSize={12}>No guides match your profile yet.</Text>;
    };

    return (
        <Flex py={4} px={4} direction="column" gap={4} border={'1px solid'} borderColor={'border'} rounded={6}>
            <Text fontSize={14}>Recommended Guides</Text>

            {guides.length ? <>{renderList()}</> : <>{renderNoGuides()}</>}
        </Flex>
    );
};
