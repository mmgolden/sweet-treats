import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        addToCart({ variables: { id } });
      }}
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
