import Reset from '../components/Reset';

const ResetPage = ({ query: { resetToken } }) => (
  <Reset resetToken={resetToken} />
);

export default ResetPage;
