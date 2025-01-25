import { Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { object, string } from 'valibot';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../../state/stores/auth.store';
import { usersApi } from '../../state/api/users-api';
import { FormTextInput } from '../../components/form/FormTextInput';
import { toaster } from '../../components/ui/toaster';

export const UserSetupPage = () => {
    const { setUser } = useAuthStore();

    const navigate = useNavigate();

    const { mutate, error, isPending } = useMutation({
        mutationKey: ['setupUser'],
        mutationFn: async (data: any) => {
            const user = await usersApi.setupUser({
                firstName: data.firstName,
                lastName: data.lastName,
            });

            setUser(user);

            if (user.domains.length) {
                navigate(`/${user.domains[0].domainId}/domain/overview`);
            } else {
                navigate('/setup/domain');
            }
        },
    });

    useEffect(() => {
        if (error) {
            toaster.create({
                title: 'Something went wrong',
                status: 'error',
                position: 'top',
                isClosable: true,
            });
        }
    }, [error]);

    const { handleSubmit, control } = useForm({
        values: {
            firstName: '',
            lastName: '',
        },
        resolver: valibotResolver(
            object({
                firstName: string(),
                lastName: string(),
            }),
        ),
    });

    return (
        <Flex minWidth={300} height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={handleSubmit(mutate as any)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading>About You</Heading>
                    <FormTextInput name={'firstName'} control={control} placeholder={'First Name'} />
                    <FormTextInput name={'lastName'} control={control} placeholder={'Last Name'} />
                    <Button
                        loading={isPending}
                        size={'sm'}
                        width={'100%'}
                        type={'submit'}
                        color={'white'}
                        backgroundColor={'gray.700'}
                    >
                        Continue
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};
