import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const useToggleCart = () => useMutation(TOGGLE_CART_MUTATION);

export default useToggleCart;
