import styled from 'styled-components';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import RequestReset from '../components/RequestReset';

const SigninPage = () => (
  <Columns>
    <Signup />
    <Signin />
    <RequestReset />
  </Columns>
);

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default SigninPage;
