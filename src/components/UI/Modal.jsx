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
            handleCloseDialog()
        }
    }, [isOpen])

    const handleCloseDialog = () => {
        dialogRef.current.close()
    }
    const dialogJSX = 
    (<dialog className={`${className} modal`} {...rest} ref={dialogRef} onClose={handleCloseDialog}>
        {children}
        <div className="modal-actions">
            {actionTitle && 
                <Button onClick={onDoAction} disabled={isActionDisable || isLoading} className={'button-flex'}>
                     {isLoading && <div> <Spinner/></div> }
                    <div>{actionTitle}</div>
                    
                </Button>
            }
            <Button isTextButton onClick={handleCloseDialog}>
                Close
            </Button>
        </div>
    </dialog>) 
    return createPortal(dialogJSX, document.getElementById('modal'))

}
export default Modal