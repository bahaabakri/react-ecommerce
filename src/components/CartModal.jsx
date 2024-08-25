import { useContext } from "react"
import Button from "./UI/Button"
import Modal from "./UI/Modal"
import CartContext from "../state/CartContext"

const CartModal = ({totalCartItems, isOpen, handleCloseCartModal}) => {
    const {items, updateCartQuantity} = useContext(CartContext)
    const onPlaceOrder = () => {
        alert('Place Order HERE !!')
    }
    const onChangeQuantity = (item, quantity) => {
        updateCartQuantity(item.id, quantity)
    }
    return (
        <Modal 
                isOpen ={isOpen}
                handleCloseModal={handleCloseCartModal}
                actionTitle={'Place Order'}
                onDoAction={onPlaceOrder}>
        <div className="cart">
            <h2>Your Cart:</h2>
            <div>Cart Total: {totalCartItems} Items, {items.length} Products</div>
            <ul>
                {
                    items.map(item => {
                        return (
                            <li className="cart-item" key={item.id}>
                                <p>{item.name}</p>
                                <div className="cart-item-actions">
                                    <Button onClick={() => onChangeQuantity(item, item.quantity - 1)}>-</Button>
                                    <div className="control">
                                        <input type="text" value={item.quantity} onChange={(e) => onChangeQuantity(item, e.target.value)}/>
                                    </div>
                                    <Button onClick={() => onChangeQuantity(item, item.quantity + 1)}>+</Button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </Modal>
    )


}
export default CartModal