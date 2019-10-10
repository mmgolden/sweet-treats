import PleaseSignIn from '../components/PleaseSignIn';
import Order from '../components/Order';

const OrderPage = ({ query: { id } }) => (
  <PleaseSignIn>
    <Order id={id} />
  </PleaseSignIn>
);

export default OrderPage;
