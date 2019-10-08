import gql from 'graphql-tag';

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

export default TOGGLE_CART_MUTATION;
