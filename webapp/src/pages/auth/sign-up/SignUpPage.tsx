import { Button, Flex, Heading, Input, Link } from '@chakra-ui/react'
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, string } from 'valibot'
import { FormTextInput } from '../../../components/form/FormInput.tsx'

export const SignUpPage = () => {
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
                <Button type={'submit'} color={'white'} backgroundColor={'gray.700'}>Sign up with link</Button>
                <Link href={'/auth/sign-in'}>I already have an account.</Link>
            </Flex>
        </form>
    </Flex>
}