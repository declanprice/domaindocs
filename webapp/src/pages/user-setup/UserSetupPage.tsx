import { Button, Flex, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string } from 'valibot'
import { FormTextInput } from '@components/form/FormInput.tsx'
import { useMutation } from '@tanstack/react-query'
import { gqlClient } from '../../graphql/client.ts'
import { CREATE_USER } from '../../graphql/user/mutations.ts'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuthStore } from '@stores/auth.store.ts'

export const UserSetupPage = () => {

    console.log('i was loaded');

    const { userId, setUser } = useAuthStore();

    const navigate = useNavigate();

    const toast = useToast();

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async (data) => {
            return gqlClient.request(CREATE_USER, {
                data: {
                    userId,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            })
        }
    })

    useEffect(() => {
        if (error) {
            toast({title: 'Something went wrong', status: 'error', position: 'top', isClosable: true })
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setUser((data as any).createUser)
            navigate('/user-setup/new-domain');
        }
    }, [data])

    const { handleSubmit, control } = useForm({
        values: {
            firstName: '',
            lastName: ''
        },
        resolver: valibotResolver(object({
            firstName: string(),
            lastName: string(),
        }))
    })

    return <Flex minWidth={300} height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <form onSubmit={handleSubmit(mutate)}>
            <Flex direction={'column'} alignItems={'end'} gap={6}>
                <Heading>About You</Heading>
                <FormTextInput name={'firstName'} control={control} placeholder={'First Name'} />
                <FormTextInput name={'lastName'} control={control} placeholder={'Last Name'} />
                <Button isLoading={isPending} size={'sm'} width={'100%'} type={'submit'} color={'white'} backgroundColor={'gray.700'}>Continue</Button>
            </Flex>
        </form>
    </Flex>
}