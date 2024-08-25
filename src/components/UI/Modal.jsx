import { useEffect, useRef } from "react"
import Button from "./Button"

const Modal = ({children, isOpen, actionTitle, onDoAction, handleCloseModal, ...rest}) => {
    const dialogRef = useRef()
    useEffect(() => {
        if(isOpen) {
            dialogRef.current.showModal()
        } else {
            onClose()
        }
    }, [isOpen])

    const onClose = () => {
        dialogRef.current.close()
        handleCloseModal()
    }
    return (
        <dialog className='modal' {...rest} ref={dialogRef}>
            {children}
            <div className="modal-actions">
                {actionTitle && 
                    <Button onClick={onDoAction}>
                        {actionTitle}
                    </Button>
                }
                <Button isTextButton onClick={onClose}>
                    Close
                </Button>
            </div>
        </dialog>
    )
}
export default Modal