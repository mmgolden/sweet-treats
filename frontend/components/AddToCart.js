import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart({ variables: { id } });
      }}
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
