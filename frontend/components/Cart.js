import { useQuery } from '@apollo/react-hooks';
import CheckoutButton from './styles/CheckoutButton';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import useToggleCart from '../hooks/useToggleCart';
import useUserQuery from '../hooks/useUserQuery';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import LOCAL_STATE_QUERY from '../graphql/queries/localState';

const Cart = () => {
  const [toggleCart] = useToggleCart();

  const { data: localData } = useQuery(LOCAL_STATE_QUERY);

  const { data: userData = {} } = useUserQuery();
  if (!userData.me) return null;

  const { cart } = userData.me;

  return (
    <CartStyles open={localData.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
        <h2>Your cart</h2>
        <p>{`You have ${cart.length} item${cart.length === 1 ? '' : 's'} in your cart.`}</p>
      </header>
      <ul>
        {cart.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart))}</p>
        <CheckoutButton type="button">Checkout</CheckoutButton>
      </footer>
    </CartStyles>
  );
};

export default Cart;
