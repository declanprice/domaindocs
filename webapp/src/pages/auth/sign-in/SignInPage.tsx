import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, email } from 'valibot';
import { FormTextInput } from '../../../components/form/FormInput.tsx'
import { useNavigate } from 'react-router-dom'

export const SignInPage = () => {

    const navigate = useNavigate();

    const { handleSubmit, control } = useForm({
        values: {
            email: ''
        },
        resolver: valibotResolver(object({
            email: string([email('Must be valid email format')])
        }))
    })

    const sendMagicLink = async (values: any) => {
        await Passwordless.createCode({
            email: values.email,
        })

        navigate('/auth/magic-link-sent')
    }

    return <Flex height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <form onSubmit={handleSubmit(sendMagicLink)}>
            <Flex direction={'column'} alignItems={'end'} gap={6}>
                <Heading>Domain Docs</Heading>
                <FormTextInput name={'email'} control={control} placeholder={'email'} />
                <Button type={'submit'} color={'white'} backgroundColor={'gray.700'}>Sign in with link</Button>
                <Link href={'/auth/sign-up'}>I don't have an account yet.</Link>
            </Flex>
        </form>
    </Flex>
}