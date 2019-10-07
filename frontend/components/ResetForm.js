import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const ResetForm = ({
  password,
  confirmPassword,
  dispatch,
  handleSubmit,
  error,
  loading,
}) => (
  <Form method="post" onSubmit={handleSubmit}>
    <ErrorMessage error={error} />
    <fieldset disabled={loading} aria-busy={loading}>
      <h2>Reset your password</h2>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
        />
      </label>
      <label htmlFor="confirmPassword">
        Confirm password
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => dispatch({ type: 'confirmPassword', payload: e.target.value })}
        />
      </label>
      <button type="submit">Reset password</button>
    </fieldset>
  </Form>
);

export default ResetForm;
