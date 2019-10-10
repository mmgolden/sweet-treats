import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import SINGLE_ORDER_QUERY from '../graphql/queries/singleOrder';

const Order = ({ id }) => {
  const { data } = useQuery(SINGLE_ORDER_QUERY);

  return (
    <div>
      <p>hi</p>
    </div>
  );
};

Order.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Order;
