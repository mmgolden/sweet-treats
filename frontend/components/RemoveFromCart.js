import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import REMOVE_FROM_CART_MUTATION from '../graphql/mutations/removeFromCart';

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
    <GhostButton
      title="Remove"
      disabled={loading}
      onClick={() => {
        removeFromCart({
          variables: { id },
        }).catch((err) => alert(err.message)); // eslint-disable-line
      }}
    >
      Remove
    </GhostButton>
  );
};

const GhostButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.black};
  font-size: 1.5rem;
  padding: 10px 12px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
