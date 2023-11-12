import './App.css'

import { createSignal } from 'solid-js'

import { CheckboxField, InputField } from '@components'

const App = () => {
    const [isChecked, setIsChecked] = createSignal<boolean>(false)
    const [value, setValue] = createSignal<string>('')

    return (
        <>
            <InputField
                label={'Input label'}
                value={value()}
                placeholder={'place holder here'}
                onChange={setValue}
            />

            <CheckboxField
                label={'My label'}
                isChecked={isChecked()}
                onChange={setIsChecked}
            />
        </>
    )
}

export default App
