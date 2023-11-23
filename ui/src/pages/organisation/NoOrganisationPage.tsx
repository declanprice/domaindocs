import { Button, InputField } from '@components'
import { createForm, zodForm } from '@modular-forms/solid'
import { createOrganisation } from '@services'
import { toast } from 'solid-toast'
import { CreateOrganisation } from 'shared-lib'
import { z } from 'zod'

export const NoOrganisationPage = () => {
    const [, { Form, Field }] = createForm<CreateOrganisation>({
        validate: zodForm(
            z.object({
                name: z.string().min(3, 'Organisation name must at least 3 characters.')
            })
        )
    })

    const handleSubmit = async (values: CreateOrganisation) => {
        try {
            await createOrganisation(values)
            console.log(values)
        } catch (error) {
            toast.error('Failed to create organisation.')
            console.log(error)
        }
    }

    return (
        <div class="bg-primary h-full w-full flex justify-center items-center">
            <Form onSubmit={handleSubmit}>
                <div class="flex flex-col items-center" style={{ width: '360px' }}>
                    <h3 class="text-white text-xl font-bold mb-2">Welcome to domaindocs!</h3>

                    <h5 class="text-white text-md mt-4 mb-8 text-center">
                        It looks like you're not a part of an organisation yet, lets get started by creating a new one
                        now.
                    </h5>

                    <Field name="name">
                        {(field, props) => (
                            <InputField
                                {...props}
                                type={'text'}
                                label={'Choose a name for your new organisation.'}
                                value={field.value}
                                error={field.error}
                                class="mb-8"
                            />
                        )}
                    </Field>

                    <Button type={'submit'} label={'Create Organisation'} class="bg-white text-black mb-4 w-full" />
                </div>
            </Form>
        </div>
    )
}
