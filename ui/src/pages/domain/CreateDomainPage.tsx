import { Button, InputField } from '@components'

export const CreateDomainPage = () => {
    return (
        <div class="flex flex-col items-center justify-center h-full w-full">
            <h1>You are not part of any domains, create one now.</h1>

            <InputField
                class="max-w-sm mt-4"
                label={'Domain Name'}
                placeholder={'My Domain Name'}
                value={''}
                onChange={() => {}}
            />

            <Button class="mt-4" label={'Create Domain'} onClick={() => {}} />
        </div>
    )
}
