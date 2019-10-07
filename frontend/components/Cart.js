import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <h2>Your cart</h2>
      <p>You have -- items in your cart.</p>
    </header>
    <footer>
      <p>$10.00</p>
      <button type="button">Checkout</button>
    </footer>
  </CartStyles>
);

export default Cart;
