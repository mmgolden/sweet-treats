import { useReducer } from 'react';
import { useMutation } from '@apollo/react-hooks';
import SigninForm from './SigninForm';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import reducer from '../lib/reducer';
import SIGNIN_MUTATION from '../graphql/mutations/signIn';

const Signin = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [signin, { loading, error }] = useMutation(
    SIGNIN_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <SigninForm
      handleSubmit={(e) => {
        e.preventDefault();
        signin({
          variables: { ...state },
        });
        dispatch({ type: 'reset', payload: initialState });
      }}
      error={error}
      loading={loading}
      dispatch={dispatch}
      {...state}
    />
  );
};

export default Signin;
