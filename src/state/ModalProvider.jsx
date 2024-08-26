import {useState } from "react"
import ModalContext from "./ModalContext"

const ModalProvider = ({children}) => {
    const [section, setSection] = useState('')

    const showModal = (section) => {
        setSection(section)
    }
    const closeModal = () => {
        setSection('')
    }
    const modalCtx = {
        section,
        showModal,
        closeModal
    }
    return (
        <ModalContext.Provider value={modalCtx}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider