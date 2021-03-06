import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>sweet treats</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </StyledHeader>
);

const StyledHeader = styled.header`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    background: white;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.1);

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${(props) => props.theme.lightgrey};
    border-top: 1px solid ${(props) => props.theme.lightgrey};
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin: 1rem 0 1rem 2rem;
  position: relative;
  z-index: 2;
  font-family: ${(props) => props.theme.logoFontFamily};
  font-weight: normal;

  a {
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.primaryColor};
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

export default Header;
