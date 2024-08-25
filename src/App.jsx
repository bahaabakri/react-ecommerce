import Header from "./components/Header";
import Meals from "./components/Meals"
import CartProvider from "./state/CartProvider";
function App() {
  return (
    <CartProvider>
      <Header />
      <Meals />
    </CartProvider>
  );
}

export default App;
