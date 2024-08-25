import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    updateCartQuantity: (itemId, quantity) => {
    }
})
export default CartContext