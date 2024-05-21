import { useState } from 'react';

export const useEditable = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onEdit = () => {
        setIsEditing(true);
    };

    const onClose = () => {
        setIsEditing(false);
    };

    return {
        isEditing,
        onEdit,
        onClose,
    };
};
