import { Button, CheckboxField, InputField } from '@components'
import { SelectField } from '../../components/fields/SelectField.tsx'

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

            <SelectField
                label={'Countries'}
                items={[
                    { label: 'UK', value: 'UK' },
                    { label: 'UKS', value: 'UKS' }
                ]}
                value={'UK'}
                onChange={(v) => {
                    console.log(v)
                }}
            />
        </>
    )
}
