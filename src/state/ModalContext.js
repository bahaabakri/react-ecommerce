import { createContext } from "react";

const ModalContext = createContext({
    section: '',
    showModal: (section) => {},
    closeModal: () => {}
})
export default ModalContext