import styled from 'styled-components';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const SigninPage = () => (
  <Columns>
    <Signup />
    <Signin />
  </Columns>
);

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default SigninPage;
