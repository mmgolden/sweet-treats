import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import RequestResetForm from './RequestResetForm';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const [requestReset, { loading, error, called }] = useMutation(REQUEST_RESET_MUTATION);

  return (
    <RequestResetForm
      handleSubmit={(e) => {
        e.preventDefault();
        requestReset({
          variables: { email },
        });
      }}
      error={error}
      loading={loading}
      called={called}
      email={email}
      setEmail={setEmail}
    />
  );
};

export default RequestReset;
