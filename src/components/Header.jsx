import { useContext } from 'react'
import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../state/CartContext'
import { useState } from 'react'
import CartModal from './CartModal'
import ModalContext from '../state/ModalContext'
const Header = () => {
    const {totalCartItems} = useContext(CartContext)
    const {showModal} = useContext(ModalContext)


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

        </>

    )

}
export default Header