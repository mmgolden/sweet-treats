import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => {
  const [signout] = useMutation(
    SIGN_OUT_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <button
      type="button"
      onClick={signout}
    >
      Sign out
    </button>
  );
};

export default Signout;
