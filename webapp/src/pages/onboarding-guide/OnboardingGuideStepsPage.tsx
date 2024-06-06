import { useNavigate, useParams } from 'react-router-dom';
import { OnboardingGuidePageParams } from './OnboardingGuidePageParams';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import { GiGraduateCap } from 'react-icons/gi';

export const OnboardingGuideStepsPage = () => {
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
                            Onboarding Centre
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/onboarding-centre/${guideId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Guide name
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem fontSize={14}>
                        <BreadcrumbLink
                            href={`/${domainId}/onboarding-centre/${guideId}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Fields
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <GiGraduateCap color={'white'} />
                </Flex>
                <Text fontSize={18} fontWeight={500}>
                    Guide name
                </Text>
                fields
            </Flex>
        </Flex>
    );
};
