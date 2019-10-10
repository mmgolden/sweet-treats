import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import useUserQuery from '../hooks/useUserQuery';
import getTotalItems from '../lib/getTotalItems';
import CREATE_ORDER_MUTATION from '../graphql/mutations/createOrder';

const STRIPE_PUBLISHABLE = 'pk_test_bF0XWyR43J5v27XLGJbs2uJe00FalFUhIW';

const onToken = async (res, createOrder) => {
  const order = await createOrder({
    variables: {
      token: res.id,
    },
  }).catch((err) => alert(err.message)); // eslint-disable-line
};

const TakeMyMoney = ({ children }) => {
  const { data } = useUserQuery();
  const me = data ? data.me : null;

  const { cart, email } = me;

  const totalItems = getTotalItems(cart);

  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

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
