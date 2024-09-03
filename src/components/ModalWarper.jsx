import ModalContext from "../state/ModalContext"
import CartModal from "./CartModal"
import CheckoutModal from "./CheckoutModal"
import { useContext } from "react"

const ModalWarper = () => {
    const {section} = useContext(ModalContext)
    return <>
        {section == 'cart' && 
            <CartModal />
        }
        {section == 'checkout' && 
            <CheckoutModal />
        }
    </>
}
export default ModalWarper