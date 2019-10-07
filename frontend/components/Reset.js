import { useReducer } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import reducer from '../lib/reducer';
import ResetForm from './ResetForm';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const Reset = ({ resetToken }) => {
  const initialState = {
    password: '',
    confirmPassword: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [resetPassword, { loading, error, called }] = useMutation(
    RESET_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <ResetForm
      handleSubmit={(e) => {
        e.preventDefault();
        resetPassword({
          variables: {
            ...state,
            resetToken,
          },
        });
      }}
      error={error}
      loading={loading}
      called={called}
      dispatch={dispatch}
      {...state}
    />
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
