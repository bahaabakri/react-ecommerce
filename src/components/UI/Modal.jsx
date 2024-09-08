import { useEffect, useRef, useContext } from "react"
import ModalContext from '../../state/ModalContext'
import Button from "./Button"
import { createPortal } from "react-dom"
import Spinner from "../Spinner"

const Modal = ({children, isOpen, isActionDisable, actionTitle, onDoAction, className,isLoading, ...rest}) => {
    const dialogRef = useRef()
    const {closeModal} = useContext(ModalContext)
    useEffect(() => {
        if(isOpen) {
            dialogRef.current.showModal()
        } else {
            close()
        }
    }, [isOpen])

    const close = () => {
        dialogRef.current.close()
    }
    const dialogJSX = 
    (<dialog className={`${className} modal`} {...rest} ref={dialogRef} onClose={() => closeModal()}>
        {children}
        <div className="modal-actions">
            {actionTitle && 
                <Button onClick={onDoAction} disabled={isActionDisable} className={'button-flex'}>
                     {isLoading && <div> <Spinner/></div> }
                    <div>{actionTitle}</div>
                    
                </Button>
            }
            <Button isTextButton onClick={close}>
                Close
            </Button>
        </div>
    </dialog>) 
    return createPortal(dialogJSX, document.getElementById('modal'))

}
export default Modal