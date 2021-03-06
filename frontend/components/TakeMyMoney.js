import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import NProgress from 'nprogress';
import calcTotalPrice from '../lib/calcTotalPrice';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import useUserQuery from '../hooks/useUserQuery';
import getTotalItems from '../lib/getTotalItems';
import CREATE_ORDER_MUTATION from '../graphql/mutations/createOrder';

const STRIPE_PUBLISHABLE = 'pk_test_bF0XWyR43J5v27XLGJbs2uJe00FalFUhIW';

const onToken = async (res, createOrder) => {
  NProgress.start();

  const order = await createOrder({
    variables: {
      token: res.id,
    },
  }).catch((err) => alert(err.message)); // eslint-disable-line

  Router.push({
    pathname: '/order',
    query: { id: order.data.createOrder.id },
  });
};

const TakeMyMoney = ({ children }) => {
  const { data } = useUserQuery();
  const me = data ? data.me : null;

  const { cart, email } = me;

  const totalItems = getTotalItems(cart);

  const [createOrder] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  const image = cart.length && cart[0].item && cart[0].item.image;

  return (
    <StripeCheckout
      amount={calcTotalPrice(cart)}
      name="Sweet Treats"
      description={`Order of ${totalItems}`}
      image={image}
      stripeKey={STRIPE_PUBLISHABLE}
      currency="USD"
      email={email}
      token={(res) => onToken(res, createOrder)}
    >
      {children}
    </StripeCheckout>
  );
};

export default TakeMyMoney;
