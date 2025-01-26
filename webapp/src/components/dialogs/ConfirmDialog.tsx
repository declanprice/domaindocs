import { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot } from '../ui/dialog';
import { OpenChangeDetails } from '@zag-js/dialog';

type ConfirmDialogProps = {
    isOpen: boolean;
    header?: string;
    body?: any;
    onConfirm: () => Promise<void>;
    onCancel: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { isOpen, header, body, onConfirm, onCancel } = props;

    const ref = useRef();

    const [isLoading, setIsLoading] = useState(false);

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(details: OpenChangeDetails) => {
                if (!details.open) {
                    // onCancel();
                }
            }}
            leastDestructiveRef={ref as any}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </DialogHeader>

                {body && <DialogBody>{body}</DialogBody>}

                <DialogFooter>
                    <Button ref={ref as any} onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button
                        colorPalette="red"
                        onClick={async () => {
                            try {
                                setIsLoading(true);
                                await onConfirm();
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        ml={3}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
