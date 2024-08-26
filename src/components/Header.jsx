import { useContext } from 'react'
import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../state/CartContext'
import { useState } from 'react'
import CartModal from './CartModal'
import ModalContext from '../state/ModalContext'
const Header = () => {
    const {items} = useContext(CartContext)
    const {section, showModal} = useContext(ModalContext)
    const totalCartItems = items.reduce((accum, currentVal) => {
        return (+accum + +currentVal.quantity)
    }, 0)

    return (
        <>
            <header id="main-header">
                <h2 id="title">Commercial
                    <img src={Logo} alt="" />
                </h2>
                <Button
                    onClick={() => showModal('cart')}
                    isTextButton>
                    Cart ({totalCartItems})
                </Button>
            </header>
            {section == 'cart' && 
            <CartModal 
                totalCartItems={totalCartItems}>
            </CartModal>}

        </>

    )

}
export default Header