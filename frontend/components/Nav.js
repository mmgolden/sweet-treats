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
          <p>{data.me.name}</p>
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
