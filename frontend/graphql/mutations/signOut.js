import gql from 'graphql-tag';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

export default SIGN_OUT_MUTATION;
