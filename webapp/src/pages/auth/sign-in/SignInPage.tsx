import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import Passwordless from 'supertokens-web-js/recipe/passwordless'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, email } from 'valibot'
import { useNavigate } from 'react-router-dom'
import { FormTextInput } from '../../../components/form/FormInput.tsx'

export const SignInPage = () => {
    const navigate = useNavigate()

    const { handleSubmit, control } = useForm({
        values: {
            email: '',
        },
        resolver: valibotResolver(
            object({
                email: string([email('Must be valid email format')]),
            })
        ),
    })

    const sendMagicLink = async (values: any) => {
        await Passwordless.createCode({
            email: values.email,
        })

        navigate('/auth/magic-link-sent')
    }

    return (
        <Flex
            minWidth={300}
            height={'100%'}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <form onSubmit={handleSubmit(sendMagicLink)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading size={'lg'}>Domain Docs</Heading>
                    <Heading size={'md'}>Sign In</Heading>
                    <FormTextInput
                        name={'email'}
                        control={control}
                        placeholder={'type your email here'}
                    />
                    <Button
                        size={'xs'}
                        width={'100%'}
                        type={'submit'}
                        color={'white'}
                        backgroundColor={'gray.700'}
                    >
                        Sign In
                    </Button>

                    <Link
                        fontSize={12}
                        href={undefined}
                        onClick={() => {
                            navigate('/auth/sign-up')
                        }}
                    >
                        I don't have an account.
                    </Link>
                </Flex>
            </form>
        </Flex>
    )
}
