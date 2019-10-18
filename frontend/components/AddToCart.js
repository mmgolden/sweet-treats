import { useMutation } from '@apollo/react-hooks';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import ADD_TO_CART_MUTATION from '../graphql/mutations/addToCart';

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
      data-testid="addToCartButton"
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
