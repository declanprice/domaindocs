import { DetailedOnboardingGuide, OnboardingProgressStatus } from '@domaindocs/lib';
import { Button, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type OnboardingRecommendedList = {
    domainId: string;
    guides: DetailedOnboardingGuide[];
};

export const OnboardingRecommendedList = (props: OnboardingRecommendedList) => {
    const { guides, domainId } = props;

    const navigate = useNavigate();

    const renderList = () => {
        const renderStatus = (guide: DetailedOnboardingGuide) => {
            if (guide.progress === null || guide.progress.status == OnboardingProgressStatus.NOT_STARTED) {
                return <Text>Not Started</Text>;
            }

            if (guide.progress.status == OnboardingProgressStatus.IN_PROGRESS) {
                return <Text>In Progress</Text>;
            }

            return <Text>Complete</Text>;
        };

        return (
            <List spacing={2}>
                {guides.map((guide: DetailedOnboardingGuide) => (
                    <ListItem
                        fontSize={12}
                        key={guide.guide.guideId}
                        as={Button}
                        variant={'ghost'}
                        width={'100%'}
                        onClick={() => {
                            navigate(`/${domainId}/onboarding/${guide.guide.guideId}`);
                        }}
                    >
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
