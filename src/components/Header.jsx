import Logo from '../assets/logo.jpg'
const Header = () => {
    return (
        <header id="main-header">
            <h2 id="title">Commercial
                <img src={Logo} alt="" />
            </h2>
           
            <button>Cart</button>
        </header>
    )

}
export default Header