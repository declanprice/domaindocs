import { BaseModelProps, Modal } from '@components'

type AddSubDomainModal = {} & BaseModelProps

export const AddSubDomainModal = (props: AddSubDomainModal) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            header={'Add Sub Domain'}
            body={<></>}
            footer={<></>}
        />
    )
}
