import { useReducer } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SigninForm from './SigninForm';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import reducer from '../lib/reducer';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

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
      }}
      error={error}
      loading={loading}
      dispatch={dispatch}
      {...state}
    />
  );
};

export default Signin;
