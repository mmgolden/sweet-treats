import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

const useUserQuery = () => useQuery(CURRENT_USER_QUERY);

export default useUserQuery;
