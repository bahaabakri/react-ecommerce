import { getCurrencyFormatter } from "../util"
import { useContext, useState } from "react"
import CartContext from "../state/CartContext"
import Button from "./UI/Button"

const CartItem = ({item}) => {
    const { updateCartQuantity, deleteItem} = useContext(CartContext)
    const [inputQuantity, setInputQuantity] = useState(item.quantity)
    const onChangeQuantity = (quantity, isFromButton = false) => {
        if (quantity < 0) {
            return
        }
        if (isFromButton) {
            // update the input status
            setInputQuantity(quantity)
        }
        if (quantity == 0) {
            onDeleteItem(item.id)
        } else {
            updateCartQuantity(item.id, quantity)
        }
    }
    const onDeleteItem = (itemId) => {
        deleteItem(itemId)
    }
    return (
        <li className="cart-item">
        <p>{item.name} &nbsp; <span className="text-bold">({getCurrencyFormatter.format(item.price)} X {item.quantity}) &nbsp;</span></p>
        <div className="cart-item-actions">
            <Button onClick={() => onChangeQuantity(item.quantity - 1, true)}>-</Button>
            <div className="control">
                <input type="text"
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(e.target.value)}
                    onBlur={(e) => onChangeQuantity(e.target.value)}
                    />
            </div>
            <Button onClick={() => onChangeQuantity(item.quantity + 1, true)}>+</Button>
        </div>
    </li>
    )
}
export default CartItem