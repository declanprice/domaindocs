import { IoDocument } from 'solid-icons/io'
import { Button, InputField } from '@components'
import { email, Input, minLength, object, string } from 'valibot'
import { createForm, valiForm } from '@modular-forms/solid'
import { signIn } from '@services'

const SignInSchema = object({
    email: string([minLength(1, 'Please enter your email.'), email('The email address is badly formatted.')]),
    password: string([
        minLength(1, 'Please enter your password.'),
        minLength(8, 'You password must have 8 characters or more.')
    ])
})

type SignInForm = Input<typeof SignInSchema>

export const AuthSignInPage = () => {
    const [, { Form, Field }] = createForm<SignInForm>({
        validate: valiForm(SignInSchema)
    })

    const handleSubmit = async (values: SignInForm) => {
        try {
            await signIn(values)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="bg-primary h-full w-full flex justify-center items-center">
            <Form onSubmit={handleSubmit}>
                <div class="flex flex-col items-center" style={{ width: '400px' }}>
                    <IoDocument size={'4rem'} color="white" />

                    <h3 class="text-white text-xl font-bold">Domaindocs</h3>

                    <h5 class="text-white text-md mt-4 mb-8">Sign in to your account</h5>

                    <Field name="email">
                        {(field, props) => (
                            <InputField
                                {...props}
                                type={'email'}
                                placeholder={'Email'}
                                value={field.value}
                                error={field.error}
                                class="mb-8"
                            />
                        )}
                    </Field>

                    <Field name="password">
                        {(field, props) => (
                            <InputField
                                {...props}
                                type={'password'}
                                placeholder={'Password'}
                                value={field.value}
                                error={field.error}
                                class="mb-8"
                            />
                        )}
                    </Field>

                    <Button type={'submit'} label={'Sign in'} class="bg-white text-black mb-4" />

                    <span class="text-gray-300 text-sm">Not a member?, start a 14 day free trial.</span>
                </div>
            </Form>
        </div>
    )
}
