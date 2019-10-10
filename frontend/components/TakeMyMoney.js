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

const STRIPE_PUBLISHABLE = 'pk_test_bF0XWyR43J5v27XLGJbs2uJe00FalFUhIW';

const onToken = (res) => console.log(res);

const TakeMyMoney = ({ children }) => {
  const { data } = useUserQuery();
  const me = data ? data.me : null;

  const { cart, email } = me;

  const totalItems = getTotalItems(cart);

  return (
    <StripeCheckout
      amount={calcTotalPrice(cart)}
      name="Sweet Treats"
      description={`Order of ${totalItems}`}
      image={cart[0].item && cart[0].item.image}
      stripeKey={STRIPE_PUBLISHABLE}
      currency="USD"
      email={email}
      token={(res) => onToken(res)}
    >
      {children}
    </StripeCheckout>
  );
};

export default TakeMyMoney;
