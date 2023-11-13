import { Button, CheckboxField, InputField } from '@components'

export const DomainPage = () => {
    return (
        <>
            <Button target={'defaultModal'} label={'Toggle Flowbite model'} />

            <InputField
                label={'First name'}
                value={'test'}
                onChange={() => {}}
            />

            <CheckboxField
                label={'checkbox'}
                value={true}
                onChange={() => {}}
            />
        </>
    )
}
