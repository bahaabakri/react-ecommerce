import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    updateCartQuantity: (itemId, quantity) => {},
    deleteItem: (itemId) => {}
})
export default CartContext