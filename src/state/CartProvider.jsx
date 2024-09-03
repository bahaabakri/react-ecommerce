import { useReducer } from "react"
import CartContext from "./CartContext"

const ADD_ITEM = 'ADD_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM' 

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
        const exsistingCardItemIndex = updatedItems.findIndex(el => el.id === action.payload.itemId)
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
    if (action.type === DELETE_ITEM) {
        const elementToDeleteIndex = updatedItems.findIndex(el => el.id == action.payload.itemId)
        updatedItems.splice(elementToDeleteIndex, 1)
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
    const handleDeleteItem = (itemId) => {
        dispatchCart({
            type: DELETE_ITEM,
            payload: {itemId}
        })
    }
    const totalCartPrice = cartState.items.reduce((accum, item,) => {
        return +accum + (item.quantity * item.price)
    }, 0)
    const totalCartItems = cartState.items.reduce((accum, currentVal) => {
        return (+accum + +currentVal.quantity)
    }, 0)
    const cartCtx = {
        items: cartState.items,
        totalCartPrice,
        totalCartItems,
        addItem: handleAddItem,
        updateCartQuantity: handleUpdateQuantity,
        deleteItem: handleDeleteItem,
    }
    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    )
}
export default  CartProvider