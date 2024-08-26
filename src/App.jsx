import Header from "./components/Header";
import Meals from "./components/Meals"
import CartProvider from "./state/CartProvider";
import ModalProvider from "./state/ModalProvider";
function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <Header />
        <Meals />
      </CartProvider>
    </ModalProvider>

  );
}

export default App;
