import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUserQuery from '../hooks/useUserQuery';
import useToggleCart from '../hooks/useToggleCart';
import Signout from './Signout';

const Nav = () => {
  const { data = {} } = useUserQuery();

  const [toggleCart] = useToggleCart();

  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {data.me ? (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Signout />
          <button type="button" onClick={toggleCart}>My cart</button>
        </>
      ) : (
        <Link href="/signin">
          <a>Signin</a>
        </Link>
      )}
    </NavStyles>
  );
};

export default Nav;
