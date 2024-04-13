import { Button, Flex, Heading } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string } from 'valibot'
import { DefaultError, useMutation } from '@tanstack/react-query'
import {
    CreateSubdomainData,
    Subdomain,
    subdomainApi,
} from '@state/api/subdomain-api.ts'
import { FormTextInput } from '@components/form/FormInput.tsx'
import { queryClient } from '@state/query-client.ts'

type CreateSubdomainForm = {
    subdomainName: string
}

export const SubdomainCreatePage = () => {
    const { domainId } = useParams()

    const navigate = useNavigate()

    const { mutate } = useMutation<
        Subdomain,
        DefaultError,
        CreateSubdomainData
    >({
        mutationKey: ['createSubdomain'],
        mutationFn: (data) => subdomainApi.createSubdomain(data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ['domainSubdomains'],
            })

            navigate(`/${domainId}/sd/${data.subdomainId}/overview`)
        },
    })

    const { handleSubmit, control } = useForm<CreateSubdomainForm>({
        values: {
            subdomainName: '',
        },
        resolver: valibotResolver(
            object({
                subdomainName: string([]),
            })
        ),
    })

    const onSubmit = (data: CreateSubdomainForm) => {
        return mutate({
            domainId: domainId as string,
            subdomainName: data.subdomainName,
        })
    }

    return (
        <Flex
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <form
                onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                })}
            >
                <Flex
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    gap={6}
                >
                    <Heading size={'md'}>Add a new subdomain.</Heading>

                    <FormTextInput
                        name={'subdomainName'}
                        control={control}
                        placeholder={'subdomains name'}
                    />

                    <Button
                        size={'xs'}
                        width={'100%'}
                        type={'submit'}
                        color={'white'}
                        backgroundColor={'gray.700'}
                    >
                        Add Subdomain
                    </Button>
                </Flex>
            </form>
        </Flex>
    )
}
