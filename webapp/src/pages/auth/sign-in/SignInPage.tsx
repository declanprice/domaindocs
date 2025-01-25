import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { object, string, email } from 'valibot';
import { useNavigate } from 'react-router-dom';
import { FormTextInput } from '../../../components/form/FormTextInput';

export const SignInPage = () => {
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
        <Flex height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={handleSubmit(sendMagicLink)}>
                <Flex minWidth={300} direction={'column'} alignItems={'end'} gap={6}>
                    <Heading size={'3xl'}>Domain Docs</Heading>
                    <Text textStyle={'2xl'}>Sign In</Text>
                    <FormTextInput name={'email'} control={control} placeholder={'type your email here'} />
                    <Button width={'100%'} type={'submit'} colorPalette={'gray'}>
                        Sign In
                    </Button>

                    <Link
                        href={undefined}
                        onClick={() => {
                            navigate('/auth/sign-up');
                        }}
                    >
                        I don't have an account.
                    </Link>
                </Flex>
            </form>
        </Flex>
    );
};
