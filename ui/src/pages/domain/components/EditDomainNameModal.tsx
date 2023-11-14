import { BaseModelProps, Modal } from '@components'

type EditDomainNameModalProps = {} & BaseModelProps

export const EditDomainNameModal = (props: EditDomainNameModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            header={'Edit Domain Name'}
            body={<></>}
            footer={<></>}
        />
    )
}
