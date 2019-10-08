import gql from 'graphql-tag';

const CREATE_ITEM_MUTATON = gql`
  mutation CREATE_ITEM_MUTATON(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default CREATE_ITEM_MUTATON;
