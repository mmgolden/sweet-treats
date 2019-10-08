import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import useToggleCart from '../hooks/useToggleCart';
import useUserQuery from '../hooks/useUserQuery';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

export const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

const Cart = () => {
  const [toggleCart] = useToggleCart();

  const { data: localData } = useQuery(LOCAL_STATE_QUERY);

  const { data = {} } = useUserQuery();
  if (!data.me) return null;

  const { cart } = data.me;
  const { length } = cart;

  return (
    <CartStyles open={localData.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
        <h2>Your cart</h2>
        <p>{`You have ${length} item${length === 1 ? '' : 's'} in your cart.`}</p>
      </header>
      <ul>
        {cart.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart))}</p>
        <button type="button">Checkout</button>
      </footer>
    </CartStyles>
  );
};

export default Cart;
