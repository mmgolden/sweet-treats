import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import SINGLE_ORDER_QUERY from '../graphql/queries/singleOrder';

const Order = ({ id }) => {
  const { loading, error, data } = useQuery(
    SINGLE_ORDER_QUERY,
    { variables: { id } },
  );

  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>{`Sweet Treats - Order ${order.id}`}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{id}</span>
      </p>
      <p>
        <span>Charge</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Date</span>
        <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
      </p>
      <p>
        <span>Order total</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item count</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>{`Qty: ${item.quantity}`}</p>
              <p>{`Each: ${formatMoney(item.price)}`}</p>
              <p>{`Subtotal: ${formatMoney(item.price * item.quantity)}`}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

Order.propTypes = {
  id: PropTypes.string,
};

export default Order;
