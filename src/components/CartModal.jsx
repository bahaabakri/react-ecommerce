import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../state/CartContext"
import {getCurrencyFormatter} from '../util'
import ModalContext from "../state/ModalContext"
import CartItem from './CartItem'

const CartModal = () => {
    const {items, totalCartPrice, totalCartItems} = useContext(CartContext)
    const {section, closeModal, showModal} = useContext(ModalContext)
    const onNavigateToCheckout = () => {
        // To do open checkout modal 
        closeModal()
        showModal('checkout')
    }
    return (
        <Modal 
                isOpen={section == 'cart'}
                actionTitle={'Go To Checkout'}
                onDoAction={onNavigateToCheckout}
                isActionDisable={items.length == 0}
                className="cart"
                >

            <h2>Your Cart:</h2>
            {items.length > 0 
            ? 
            <>
            <div className="cart-total">Cart Total: 
                <span className="text-bold">&nbsp; ({totalCartItems}) &nbsp;</span> Item{totalCartItems > 1 && 's'}, 
                <span className="text-bold"> &nbsp; ({items.length}) &nbsp;</span> Product{items.length > 1 && 's'}
                <span className="text-bold">&nbsp; ({getCurrencyFormatter.format(totalCartPrice)}) &nbsp;</span> 
            </div> 
            <ul>
                {items.map(item => <CartItem item={item} key={item.id}></CartItem>)}
            </ul>
            </>

            : <p>No any item in the cart</p>}

        </Modal>
    )


}
export default CartModal