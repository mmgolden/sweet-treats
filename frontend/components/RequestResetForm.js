import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const RequestResetForm = ({
  email,
  setEmail,
  handleSubmit,
  error,
  loading,
  called,
}) => (
  <Form method="post" onSubmit={handleSubmit}>
    <ErrorMessage error={error} />
    <fieldset disabled={loading} aria-busy={loading}>
      <h2>Request a password reset</h2>
      {!error && !loading && called && <p>Success! Check your email for a reset link.</p>}
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Request reset</button>
    </fieldset>
  </Form>
);

export default RequestResetForm;
