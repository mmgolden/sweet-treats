import { useMutation } from '@apollo/react-hooks';
import TOGGLE_CART_MUTATION from '../graphql/mutations/toggleCart';

const useToggleCart = () => useMutation(TOGGLE_CART_MUTATION);

export default useToggleCart;
