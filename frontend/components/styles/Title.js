import styled from 'styled-components';

const Title = styled.h3`
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  a {
    display: inline;
    line-height: 1.3;
    font-size: 1.5rem;
    text-align: center;
    color: ${(props) => props.theme.black};
  }
`;

export default Title;
