import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUserQuery from './User';

const Nav = () => {
  const { data = {} } = useUserQuery();

  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/me">
        <a>Account</a>
      </Link>
      {data.me && <p>{data.me.name}</p>}
    </NavStyles>
  );
};

export default Nav;
