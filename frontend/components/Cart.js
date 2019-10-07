import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import useToggleCart from '../hooks/useToggleCart';

export const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

const Cart = () => {
  const { data } = useQuery(LOCAL_STATE_QUERY);

  const [toggleCart] = useToggleCart();

  return (
    <CartStyles open={data.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
        <h2>Your cart</h2>
        <p>You have -- items in your cart.</p>
      </header>
      <footer>
        <p>$10.00</p>
        <button type="button">Checkout</button>
      </footer>
    </CartStyles>
  );
};

export default Cart;
