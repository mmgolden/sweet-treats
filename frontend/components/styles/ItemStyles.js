import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    font-size: 1.5rem;
    margin: 0;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${(props) => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;
