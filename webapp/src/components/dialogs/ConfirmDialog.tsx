import { Button, Dialog } from '@chakra-ui/react';

import { useRef } from 'react';

type ConfirmDialogProps = {
    isOpen: boolean;
    header?: string;
    body?: any;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { isOpen, header, body, onConfirm, onCancel } = props;

    const ref = useRef();

    return (
        <Dialog.Root isOpen={isOpen} leastDestructiveRef={ref as any} onClose={onCancel}>
            <Dialog.Content>
                <Dialog.Header fontSize="lg" fontWeight="bold">
                    {header}
                </Dialog.Header>

                {body && <Dialog.Body>{body}</Dialog.Body>}

                <Dialog.Footer>
                    <Button size={'sm'} ref={ref as any} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button size={'sm'} colorScheme="red" onClick={onConfirm} ml={3}>
                        Confirm
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
