import { useEffect, useRef, useContext } from "react"
import ModalContext from '../../state/ModalContext'
import Button from "./Button"
import { createPortal } from "react-dom"

const Modal = ({children, isOpen, actionTitle, onDoAction, className, ...rest}) => {
    const dialogRef = useRef()
    const {closeModal} = useContext(ModalContext)
    useEffect(() => {
        if(isOpen) {
            dialogRef.current.showModal()
        } else {
            onClose()
        }
    }, [isOpen])

    const onClose = () => {
        dialogRef.current.close()
        closeModal()
    }
    const dialogJSX = 
    (<dialog className={`${className} modal`} {...rest} ref={dialogRef}>
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
    </dialog>) 
    return createPortal(dialogJSX, document.getElementById('modal'))

}
export default Modal