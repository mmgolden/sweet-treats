import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

export default LOCAL_STATE_QUERY;
