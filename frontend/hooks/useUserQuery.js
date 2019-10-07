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

const useUserQuery = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  return { loading, error, data };
};

export default useUserQuery;
