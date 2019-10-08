import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import reducer from '../lib/reducer';
import ResetForm from './ResetForm';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import RESET_MUTATION from '../graphql/mutations/reset';

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
        dispatch({ type: 'reset', payload: initialState });
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
