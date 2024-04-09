import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string } from 'valibot'
import { FormTextInput } from '@components/form/FormInput.tsx'

export const CreateDomainPage = () => {
    const navigate = useNavigate()

    const { handleSubmit, control } = useForm({
        values: {
            domainName: '',
        },
        resolver: valibotResolver(
            object({
                domainName: string(),
            })
        ),
    })

    const submit = async () => {
        navigate('/dashboard')
    }

    return (
        <Flex
            height={'100%'}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <form onSubmit={handleSubmit(submit)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading>Create Domain</Heading>
                    <FormTextInput
                        name={'domainName'}
                        control={control}
                        placeholder={'Domain Name'}
                    />
                    <Button
                        type={'submit'}
                        color={'white'}
                        backgroundColor={'gray.700'}
                    >
                        Continue
                    </Button>
                    <Link href={'/auth/sign-in'}>Join an existing domain.</Link>
                </Flex>
            </form>
        </Flex>
    )
}
