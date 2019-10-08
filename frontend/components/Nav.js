import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUserQuery from '../hooks/useUserQuery';
import useToggleCart from '../hooks/useToggleCart';
import Signout from './Signout';
import CartCount from './CartCount';

const Nav = () => {
  const { data } = useUserQuery();
  const me = data ? data.me : null;

  const [toggleCart] = useToggleCart();

  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {me && (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          {/* <Link href="/orders">
            <a>Orders</a>
          </Link> */}
          {/* <Link href="/me">
            <a>Account</a>
          </Link> */}
          <Signout />
          <button type="button" onClick={toggleCart}>
            My cart
            <CartCount
              count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}
            />
          </button>
        </>
      )}
      {!me && (
        <Link href="/signin">
          <a>Signin</a>
        </Link>
      )}
    </NavStyles>
  );
};

export default Nav;
