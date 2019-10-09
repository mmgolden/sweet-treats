import gql from 'graphql-tag';

const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UPDATE_CART_ITEM_MUTATION($id: ID!, $quantity: Int!) {
    updateCartItem(id: $id, quantity: $quantity) {
      id
      quantity
      item {
        id
      }
      user {
        id
      }
    }
  }
`;

export default UPDATE_CART_ITEM_MUTATION;
