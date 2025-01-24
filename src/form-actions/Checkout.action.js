import {use} from 'react'
import {placeOrder} from '../request'
export default async function checkoutAction(prevState, formData, items, closeModal) {
    console.log(formData)
    const dataToSend = {
        customer: Object.fromEntries(formData),
        items: items
    }
    try {
        await placeOrder(dataToSend)
        closeModal()
        return {error: null}
    } catch(err) {
        return {error: err.message || "Something went wrong !!!"}
    }
} 