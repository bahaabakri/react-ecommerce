import Header from "./components/Header";
import Meals from "./components/Meals"
import CartProvider from "./state/CartProvider";
import ModalProvider from "./state/ModalProvider";
import ModalWarper from "./components/ModalWarper";
import SnackBarProvider from './state/SnackBarProvider';
import SnackBarWraper from './components/SnackBarWraper';
function App() {
  return (
    
    <SnackBarProvider>
      <ModalProvider>
        <CartProvider>
          <Header />
          <Meals />
          <ModalWarper />
          <SnackBarWraper/>
        </CartProvider>
      </ModalProvider>
    </SnackBarProvider>


  );
}

export default App;
