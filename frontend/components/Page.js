import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import Header from './Header';
import Meta from './Meta';
import theme from './styles/theme';

const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StyledPage>
      <Meta />
      <Header />
      <Inner>{children}</Inner>
    </StyledPage>
  </ThemeProvider>
);

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default Page;
