import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import UPDATE_CART_ITEM_MUTATION from '../graphql/mutations/updateCartItem';
import Select from './Select';

const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CartItem = ({ cartItem }) => {
  const {
    id, quantity, item, user,
  } = cartItem;

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM_MUTATION);

  // first check if that item exists
  if (!item) {
    return (
      <CartItemStyles>
        <p>This item has been removed</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }

  const { image, title, price } = item;

  return (
    <CartItemStyles>
      <div className="cart-item-details">
        <img width="100" src={image} alt={title} />
        <h3>{title}</h3>
        <Select
          name="quantitySelect"
          defaultValue={quantity}
          options={quantityOptions}
          handleChange={(e) => {
            updateCartItem({
              variables: {
                id,
                quantity: parseFloat(e.target.value),
              },
              optimisticResponse: {
                __typename: 'Mutation',
                updateCartItem: {
                  __typename: 'CartItem',
                  id,
                  quantity: parseFloat(e.target.value),
                  item: {
                    __typename: 'Item',
                    ...item,
                  },
                  user: {
                    __typename: 'User',
                    ...user,
                  },
                },
              },
            });
          }}
        />
        <p>{formatMoney(price * quantity)}</p>
      </div>
      <div className="cart-actions">
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartItemStyles>
  );
};

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
    padding-right: 12px;
  }
  select {
    background: white;
    font-size: 1.5rem;
    border: 1px solid ${(props) => props.theme.black};
    border-radius: 4px;
    padding: 10px;
    color: ${(props) => props.theme.black};
    &:focus {
      border: 1px solid ${(props) => props.theme.primaryColor};
      outline: 0px;
    }
  }
  .cart-item-details {
    display: grid;
    align-items: center;
    grid-template-columns: auto 2fr 1fr auto;
  }
  .cart-actions {
    display: flex;
    justify-content: flex-end;
  }
`;

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }),
};

export default CartItem;
