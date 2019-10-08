import { useMutation } from '@apollo/react-hooks';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import SIGN_OUT_MUTATION from '../graphql/mutations/signOut';

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
