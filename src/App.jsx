import Header from "./components/Header";
import Meals from "./components/Meals"
import CartProvider from "./state/CartProvider";
import ModalProvider from "./state/ModalProvider";
import ModalWarper from "./components/ModalWarper";
function App() {
  return (
    
    
    <ModalProvider>
      <CartProvider>
        <Header />
        <Meals />
        <ModalWarper />
      </CartProvider>
    </ModalProvider>

  );
}

export default App;
