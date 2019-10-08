import { useQuery } from '@apollo/react-hooks';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';

const useUserQuery = () => useQuery(CURRENT_USER_QUERY);

export default useUserQuery;
