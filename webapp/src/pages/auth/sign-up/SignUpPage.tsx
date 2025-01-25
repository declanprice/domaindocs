import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { email, object, string } from 'valibot';
import { FormTextInput } from '../../../components/form/FormTextInput';

export const SignUpPage = () => {
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm({
        values: {
            email: '',
        },
        resolver: valibotResolver(
            object({
                email: string([email('Must be valid email format')]),
            }),
        ),
    });

    const sendMagicLink = async (values: any) => {
        await Passwordless.createCode({
            email: values.email,
        });

        navigate('/auth/magic-link-sent');
    };

    return (
        <Flex minWidth={300} height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={handleSubmit(sendMagicLink)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading size={'3xl'}>Domain Docs</Heading>
                    <Text textStyle={'2xl'}>Sign Up</Text>
                    <FormTextInput name={'email'} control={control} placeholder={'type your email here'} />
                    <Button width={'100%'} type={'submit'} colorPalette={'gray'}>
                        Sign In
                    </Button>
                    <Link
                        href={undefined}
                        onClick={() => {
                            navigate('/auth/sign-in');
                        }}
                    >
                        I already have an account.
                    </Link>
                </Flex>
            </form>
        </Flex>
    );
};
