import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OnboardingGuidePageParams } from './OnboardingGuidePageParams';
import { HiOutlineTicket } from 'react-icons/hi';
import { GiGraduateCap } from 'react-icons/gi';

export const OnboardingGuidePage = () => {
    const { domainId, guideId } = useParams() as OnboardingGuidePageParams;

    const navigate = useNavigate();

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/${domainId}/people`}
                            fontSize={14}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${domainId}/onboarding-centre`);
                            }}
                        >
                            Ticket Centre
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/onboarding-centre/${guideId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Ticket name
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <GiGraduateCap color={'white'} />
                </Flex>

                <Text fontSize={18} fontWeight={500}>
                    Guide name
                </Text>

                <Box mt={2}>{/*<PersonAboutMe domainId={domainId} person={person} />*/}</Box>
            </Flex>

            <Flex direction={'column'} width={'350px'} p={4} gap={4}></Flex>
        </Flex>
    );
};
