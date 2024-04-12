import { useState } from 'react'

export const useEditable = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onEdit = () => {
        setIsEditing(true)
    }

    const onClose = () => {
        setIsEditing(false)
    }

    const onSubmit = async (handler: (...args: any) => any) => {
        setIsSubmitting(true)
        await handler()
        setIsSubmitting(false)
        onClose()
    }

    return {
        isEditing,
        isSubmitting,
        onEdit,
        onClose,
        onSubmit,
    }
}
