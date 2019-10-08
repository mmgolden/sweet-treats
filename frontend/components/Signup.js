import { useReducer } from 'react';
import { useMutation } from '@apollo/react-hooks';
import SignupForm from './SignupForm';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import reducer from '../lib/reducer';
import SIGNUP_MUTATION from '../graphql/mutations/signUp';

const Signup = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [signup, { loading, error }] = useMutation(
    SIGNUP_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <SignupForm
      handleSubmit={(e) => {
        e.preventDefault();
        signup({
          variables: { ...state },
        });
      }}
      error={error}
      loading={loading}
      dispatch={dispatch}
      {...state}
    />
  );
};

export default Signup;
