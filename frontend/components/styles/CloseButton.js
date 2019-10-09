import styled from 'styled-components';

const CloseButton = styled.button`
  background: ${(props) => props.theme.primaryColor};
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
