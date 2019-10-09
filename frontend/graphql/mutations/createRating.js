import gql from 'graphql-tag';

const CREATE_RATING_MUTATION = gql`
  mutation CREATE_RATING_MUTATION($id: ID!, $rating: Int!) {
    createRating(id: $id, rating: $rating) {
      id
      rating
    }
  }
`;

export default CREATE_RATING_MUTATION;
