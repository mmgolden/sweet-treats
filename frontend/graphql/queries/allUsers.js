import gql from 'graphql-tag';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

export default ALL_USERS_QUERY;
