import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';

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
        <AlertDialog isOpen={isOpen} leastDestructiveRef={ref as any} onClose={onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {header}
                    </AlertDialogHeader>

                    {body && <AlertDialogBody>{body}</AlertDialogBody>}

                    <AlertDialogFooter>
                        <Button size={'sm'} ref={ref as any} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button size={'sm'} colorScheme="red" onClick={onConfirm} ml={3}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
