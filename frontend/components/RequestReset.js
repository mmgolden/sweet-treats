import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import RequestResetForm from './RequestResetForm';
import REQUEST_RESET_MUTATION from '../graphql/mutations/requestReset';

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
        setEmail('');
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
