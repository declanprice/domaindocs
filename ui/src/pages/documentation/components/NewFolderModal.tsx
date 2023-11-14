import { BaseModelProps, Modal } from '@components'

export type NewFolderModalProps = {} & BaseModelProps

export const NewFolderModal = (props: NewFolderModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            header={'New Folder'}
            body={<></>}
            footer={<></>}
        />
    )
}
