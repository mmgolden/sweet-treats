import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      update(cache, { data }) {
        const { me } = cache.readQuery({ query: CURRENT_USER_QUERY });
        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            me: {
              ...me,
              cart: me.cart.filter((cartItem) => cartItem.id !== data.removeFromCart.id),
            },
          },
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id,
        },
      },
    },
  );

  return (
    <BigButton
      title="Delete item"
      disabled={loading}
      onClick={() => {
        removeFromCart({
          variables: { id },
        }).catch((err) => alert(err.message)); // eslint-disable-line
      }}
    >
      &times;
    </BigButton>
  );
};

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  width: 40px;
  margin-left: auto;
  &:hover {
    color: ${(props) => props.theme.primaryColor};
    cursor: pointer;
  }
`;

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
