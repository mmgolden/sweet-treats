import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SignupForm = ({
  email,
  name,
  password,
  dispatch,
  handleSubmit,
  error,
  loading,
}) => (
  <Form method="post" onSubmit={handleSubmit}>
    <ErrorMessage error={error} />
    <fieldset disabled={loading} aria-busy={loading}>
      <h2>Sign up for an account</h2>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
        />
      </label>
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
      <button type="submit">Sign up</button>
    </fieldset>
  </Form>
);

export default SignupForm;
