import { useNavigate, useParams } from 'react-router-dom';
import { OnboardingGuideFormPageToolbar } from './OnboardingGuideFormPageToolbar';
import { Box, Button, Flex } from '@chakra-ui/react';
import { OnboardingGuidePageParams } from '../onboarding-guide/OnboardingGuidePageParams';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateEditOnboardingGuideData, DetailedOnboardingGuide, DetailedTeam, Role } from '@domaindocs/lib';
import { onboardingApi } from '../../state/api/onboarding-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { FormTextInput } from '../../components/form/FormInput';
import { useForm } from 'react-hook-form';
import { FormSelectable } from '../../components/form/FormSelectable';
import { teamsApi } from '../../state/api/teams-api';
import { rolesApi } from '../../state/api/roles-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormOnboardingGuideSteps } from './components/FormOnboardingGuideSteps';

export const OnboardingGuideFormPage = () => {
    const { domainId, guideId } = useParams() as OnboardingGuidePageParams;

    const navigate = useNavigate();

    const guideQuery = useQuery<DetailedOnboardingGuide>({
        enabled: false,
        queryKey: ['getOnboardingGuide', { domainId, guideId }],
        queryFn: () => onboardingApi.get(domainId, guideId),
    });

    const teamsQuery = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.search(domainId),
    });

    const rolesQuery = useQuery<Role[]>({
        queryKey: ['searchRoles', { domainId }],
        queryFn: () => rolesApi.search(domainId),
    });

    const createGuide = useMutation({
        mutationKey: ['createGuide', { domainId }],
        mutationFn: (data: CreateEditOnboardingGuideData) => onboardingApi.create(domainId, data),
    });

    const form = useForm<CreateEditOnboardingGuideData>({
        values: {
            guideName: '',
            teamIds: [],
            roleIds: [],
            steps: [],
        },
        resolver: classValidatorResolver(CreateEditOnboardingGuideData),
    });

    const guideName = guideQuery.data?.guide ? guideQuery.data.guide.name : undefined;

    useEffect(() => {
        if (guideId) {
            guideQuery.refetch().then();
        }
    }, [guideId]);

    const submitForm = async (data: CreateEditOnboardingGuideData) => {
        await createGuide.mutateAsync(data);
        navigate(`/${domainId}/onboarding`);
    };

    if (!teamsQuery.data || !rolesQuery.data || guideQuery.isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <OnboardingGuideFormPageToolbar domainId={domainId} guideName={guideName}>
                    <Box ml={'auto'}>
                        <Button size={'xs'} colorScheme={'red'}>
                            Cancel
                        </Button>

                        <Button
                            ml={2}
                            size={'xs'}
                            colorScheme={'gray'}
                            type={'submit'}
                            onClick={() => {
                                console.log(form.getFieldState('steps'));
                            }}
                        >
                            Create
                        </Button>
                    </Box>
                </OnboardingGuideFormPageToolbar>

                <Flex width={'100%'} p={4} gap={6} flex={1} overflowY={'scroll'} direction={'column'} pb={'100px'}>
                    <FormTextInput
                        name={'guideName'}
                        control={form.control}
                        label={'Guide Name'}
                        size={'xs'}
                        placeholder={'Software Developer - Guide'}
                    />

                    <FormSelectable
                        name={'teamIds'}
                        label={'For Teams'}
                        size={'xs'}
                        control={form.control}
                        options={teamsQuery.data.map((t) => ({
                            label: t.team.name,
                            value: t.team.teamId,
                        }))}
                    />

                    <FormSelectable
                        name={'roleIds'}
                        label={'For Roles'}
                        size={'xs'}
                        control={form.control}
                        options={rolesQuery.data.map((r) => ({
                            label: r.name,
                            value: r.roleId,
                        }))}
                    />

                    <FormOnboardingGuideSteps
                        domainId={domainId}
                        size={'xs'}
                        label={'Steps'}
                        name={'steps'}
                        control={form.control}
                    />
                </Flex>
            </form>
        </Flex>
    );
};
