import { useReducer } from "react"
import CartContext from "./CartContext"

const ADD_ITEM = 'ADD_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

const CartReducer = (state, action) => {
    const updatedItems = [...state.items]
    let updatedCardItem
    if(action.type === ADD_ITEM) {
        const exsistingCardItemIndex = updatedItems.findIndex(el => el.id === action.payload.id)
        if(exsistingCardItemIndex > -1) {
            const exsistingCardItem = updatedItems[exsistingCardItemIndex]
            updatedCardItem = {
                ...exsistingCardItem,
                quantity: exsistingCardItem.quantity + 1
            }
            updatedItems[exsistingCardItemIndex] = updatedCardItem
        } else {
            updatedCardItem = {...action.payload, quantity:1}
            updatedItems.push(updatedCardItem)
        }
    }
    if(action.type === UPDATE_QUANTITY) {
        const exsistingCardItemIndex = updatedItems.findIndex(el => el.id === action.payload.id)
        if (exsistingCardItemIndex == -1) {
            return {
                items: updatedItems
            }
        }
        const exsistingCardItem = updatedItems[exsistingCardItemIndex]
        updatedCardItem = {
            ...exsistingCardItem,
            quantity: action.payload.quantity
        }
        updatedItems[exsistingCardItemIndex] = updatedCardItem

    }
    return {
        items: updatedItems
    }
}
const CartProvider = ({children}) => {
    const [cartState, dispatchCart] = useReducer(CartReducer, {
        items: []
    })

    const handleAddItem = (item) => {
        dispatchCart({
            type:ADD_ITEM,
            payload: {...item}
        })
    }

    const handleUpdateQuantity = (itemId, quantity) => {
        dispatchCart({
            type:UPDATE_QUANTITY,
            payload:{itemId, quantity}
        })
    }
    const cartCtx = {
        items: cartState.items,
        addItem: handleAddItem,
        updateCartQuantity: handleUpdateQuantity
    }
    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    )
}
export default  CartProvider