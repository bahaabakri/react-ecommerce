import { useContext } from 'react'
import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../state/CartContext'
import { useState } from 'react'
import CartModal from './CartModal'
const Header = () => {
    const {items} = useContext(CartContext)
    const totalCartItems = items.reduce((accum, currentVal) => {
        return accum + currentVal.quantity
    }, 0)
    const [isModalOpen, setModal] = useState(false)
    const handleCloseCartModal = () => {
        setModal(false)
    }
    return (
        <>
            <header id="main-header">
                <h2 id="title">Commercial
                    <img src={Logo} alt="" />
                </h2>
                <Button
                    onClick={() => setModal(true)}
                    isTextButton>
                    Cart ({totalCartItems})
                </Button>
            </header>
            {isModalOpen && 
            <CartModal 
                totalCartItems={totalCartItems} 
                isOpen={isModalOpen}
                handleCloseCartModal={handleCloseCartModal}>
                
            </CartModal>}

        </>

    )

}
export default Header