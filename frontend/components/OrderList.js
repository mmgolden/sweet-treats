import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { formatDistance } from 'date-fns';
import USER_ORDERS_QUERY from '../graphql/queries/userOrders';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';

const OrderList = () => {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error erorr={error} />;

  const { orders } = data;

  return (
    <div>
      <h2>{`You have ${orders.length} orders`}</h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a>
                <div className="order-meta">
                  <p>{`${order.items.reduce((a, b) => a + b.quantity, 0)} Items`}</p>
                  <p>{`${order.items.length} Products`}</p>
                  <p>{formatDistance(order.createdAt, new Date())}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

export default OrderList;
