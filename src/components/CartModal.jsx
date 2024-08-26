import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../state/CartContext"
import {getCurrencyFormatter} from '../util'
import ModalContext from "../state/ModalContext"
import CartItem from './CartItem'

const CartModal = ({totalCartItems}) => {
    const {items} = useContext(CartContext)
    const {section} = useContext(ModalContext)
    const totalCartPrice = items.reduce((accum, item,) => {
        return +accum + (item.quantity * item.price)
    }, 0)
    const onPlaceOrder = () => {
        alert('Place Order HERE !!')
    }
    return (
        <Modal 
                isOpen={section == 'cart'}
                actionTitle={'Place Order'}
                onDoAction={onPlaceOrder}
                className="cart"
                >

            <h2>Your Cart:</h2>
            <div className="cart-total">Cart Total: 
                <span className="text-bold">&nbsp; ({totalCartItems}) &nbsp;</span> Item{totalCartItems > 1 && 's'}, 
                <span className="text-bold"> &nbsp; ({items.length}) &nbsp;</span> Product{items.length > 1 && 's'}
                <span className="text-bold">&nbsp; ({getCurrencyFormatter.format(totalCartPrice)}) &nbsp;</span> 
            </div> 
            <ul>
                {items.map(item => <CartItem item={item} key={item.id}></CartItem>)}
            </ul>
    </Modal>
    )


}
export default CartModal