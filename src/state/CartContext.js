import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    updateCartQuantity: (itemId, quantity) => {},
    deleteItem: (itemId) => {},
    calculateTotal: 0,
    totalCartItems: 0
})
export default CartContext