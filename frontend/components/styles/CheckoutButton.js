import styled from 'styled-components';

const CheckoutButton = styled.button`
  background: ${(props) => props.theme.primaryColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
  padding: 8px 12px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export default CheckoutButton;
