import styled from 'styled-components';

const PriceTag = styled.span`
  color: ${(props) => props.theme.black};
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 1.5rem;
  display: inline-block;
  padding: 1rem;
`;

export default PriceTag;
