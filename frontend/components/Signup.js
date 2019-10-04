import { useReducer } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SignupForm from './SignupForm';
import { CURRENT_USER_QUERY } from './User';
import reducer from '../lib/reducer';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

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
